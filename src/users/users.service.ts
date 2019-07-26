import { BaseService } from '../common/base.service';
import { compare } from 'bcryptjs';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from 'typegoose';
import { RegisterVm } from './models/registervm-model';
import { User } from './models/user.model';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
    private readonly _jwtService: JwtService,
  ) {
    super();
    this._model = this._userModel;
  }

  async findAll(filter = {}, selectFields = ''): Promise<User[]> {
    let results;
    try {
      results = await super.findAll(filter, selectFields);
    } catch (e) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (results.length === 0) {
      throw new HttpException('No results', HttpStatus.NO_CONTENT);
    } else {
      return results;
    }
  }

  async findOne(filter = {}, selectFields = ''): Promise<User> {
    let result;
    try {
      result = await super.findOne(filter, selectFields);
    } catch (e) {
      throw new HttpException(
        'Internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!result) {
      throw new HttpException('No results', HttpStatus.NO_CONTENT);
    } else {
      return result;
    }
  }

  async register(user: RegisterVm): Promise<User> {
    const newUser = await this.create(user, '+email');
    return newUser;
  }

  async validateUser(email: string, candidatePassword: string): Promise<User> {
    const user = (await super.findOne(
      { email },
      '+password +role +email',
    )) as User;

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
