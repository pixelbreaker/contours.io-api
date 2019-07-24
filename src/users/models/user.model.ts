import { BaseModel, schemaOptions } from '../../common/models/basemodel.model';
import { BCRYPT_SALT_ROUNDS } from '../../constants';
import { genSalt, hash } from 'bcryptjs';
import { InstanceType, prop, pre, ModelType } from 'typegoose';
import { UserRole } from './user-role.enum';

@pre('save', async function(next) {
  const salt = await genSalt(BCRYPT_SALT_ROUNDS);
  const hashed = await hash(this.password, salt);
  this.password = hashed;

  next();
})
export class User extends BaseModel<User> {
  @prop({ required: true })
  username: string;

  @prop({ required: true, select: false })
  password: string;

  @prop({ required: true, index: true, unique: true, select: false })
  email: string;

  @prop({ enum: UserRole, default: UserRole.User, select: false })
  role?: UserRole;

  static get model(): ModelType<User> {
    return new User().getModelForClass(User, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(props: User): InstanceType<User> {
    return new this.model(props);
  }
}
