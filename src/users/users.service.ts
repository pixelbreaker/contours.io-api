import { BaseService } from '../common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { pick, omit } from 'lodash';
import { User } from './models/user.model';
import { UserVm } from './models/uservm-model';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
  ) {
    super();
    this._model = _userModel;
  }

  async findAll(filter = {}): Promise<UserVm[]> {
    const results = await super.findAll(filter);
    const mapped = results.map(item => {
      return pick(item.toObject(), UserVm.projection);
    });
    return mapped;
  }

  async findOne(filter = {}): Promise<UserVm> {
    const result = await super.findOne(filter);
    return pick(result.toObject(), UserVm.projection);
  }
}
// export class UsersService {
//   constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

//   async findAll(): Promise<User[]> {
//     return await this.userModel.find(null, User.publicProjection());
//   }

//   async findOne(
//     query: object,
//     extraFields: object = null,
//   ): Promise<User | undefined> {
//     return await this.userModel
//       .findOne(query, User.publicProjection(extraFields))
//       .lean();
//   }

//   @UseFilters(BadRequestFilter, MongoFilter)
//   async create(user: User): Promise<User> {
//     const newUser = new this.userModel(user);
//     return await newUser.save();
//   }

//   async delete(id: string): Promise<User> {
//     return await this.userModel.findByIdAndRemove(id);
//   }

//   async update(id: string, user: User | object): Promise<User> {
//     return await this.userModel.findByIdAndUpdate(id, user, { new: true });
//   }
// }
