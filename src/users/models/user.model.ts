import { BaseModel, schemaOptions } from '../../common/models/basemodel.model';
import { BCRYPT_SALT_ROUNDS } from '../../constants';
import { genSalt, hash } from 'bcryptjs';
import { InstanceType, prop, pre, ModelType, arrayProp } from 'typegoose';
import { UserRole } from './user-role.enum';

@pre<User>('save', async function(next) {
  const salt = await genSalt(BCRYPT_SALT_ROUNDS);
  const hashed = await hash(this.password, salt);
  this.password = hashed;

  next();
})
export class User extends BaseModel<User> {
  @prop({ required: true, unique: true })
  username: string;

  @prop({ required: true })
  firstname: string;

  @prop()
  lastname?: string;

  @prop()
  get fullname(): string {
    return `${this.firstname} ${this.lastname || ''}`.trim();
  }

  @prop({ required: true, select: false })
  password: string;

  @prop({ required: true, index: true, unique: true, select: false })
  email: string;

  @arrayProp({
    items: String,
    enum: UserRole,
    default: UserRole.User,
    select: false,
  })
  roles?: UserRole[];

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
