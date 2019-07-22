import { BaseService } from '../common/base.service';
import { compare } from 'bcryptjs';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from 'typegoose';
import { RegisterVm } from './models/registervm-model';
import { User } from './models/user.model';
import { UserVm } from './models/uservm-model';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
    private readonly _jwtService: JwtService,
  ) {
    super();
    this._model = this._userModel;
  }

  async findAll(filter = {}): Promise<UserVm[]> {
    let results;
    try {
      results = await super.findAll(filter);
    } catch (e) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (results.length === 0) {
      throw new HttpException('No results', HttpStatus.NO_CONTENT);
    } else {
      return results.map(item => UserVm.map(item));
    }
  }

  async findOne(filter = {}, extraFields = []): Promise<UserVm> {
    let result;
    try {
      result = await super.findOne(filter);
    } catch (e) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!result) {
      throw new HttpException('No results', HttpStatus.NO_CONTENT);
    } else {
      return UserVm.map(result, extraFields);
    }
  }

  async register(user: RegisterVm): Promise<UserVm> {
    const newUser = await this.create(user);
    return UserVm.map(newUser, ['email']);
  }

  async validateUser(email: string, candidatePassword: string): Promise<User> {
    const user = (await super.findOne({ email })) as User;
    console.log(user);

    if (user) {
      const match = await compare(candidatePassword, user.password);

      if (match) {
        return user;
      }
      return null;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user._id, role: user.role };
    return {
      token: this._jwtService.sign(payload),
    };
  }
}
