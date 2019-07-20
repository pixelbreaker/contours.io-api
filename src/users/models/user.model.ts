import { InstanceType, prop, pre, ModelType } from 'typegoose';
import { BCRYPT_SALT_ROUNDS } from '../../constants';
import { genSalt, hash } from 'bcryptjs';
import { BaseModel, schemaOptions } from '../../common/models/basemodel.model';
import { read } from 'fs';

@pre('save', async function(next) {
  const salt = await genSalt(BCRYPT_SALT_ROUNDS);
  const hashed = await hash(this.password, salt);
  this.password = hashed;

  next();
})
export class User extends BaseModel<User> {
  @prop({ required: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, index: true, unique: true })
  email: string;

  static get model(): ModelType<User> {
    // const options = {
    //   ...schemaOptions,
    //   toObject: {
    //     transform: (doc, ret) => {
    //       const { _id, password, ...rest } = ret;
    //       return rest;
    //     },
    //   },
    // };
    return new User().getModelForClass(User, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(props: User): InstanceType<User> {
    return new this.model(props);
  }
}
