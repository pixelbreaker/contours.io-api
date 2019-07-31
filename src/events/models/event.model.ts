import { BaseModel, schemaOptions } from '../../common/models/basemodel.model';
import { InstanceType, prop, pre, ModelType, Ref } from 'typegoose';
import { EventType } from './Event-type.enum';
import { LatLon } from '../../common/types';
import { Types, Schema } from 'mongoose';
import { User } from '../../users/models/user.model';
import { Length } from 'class-validator';

@pre<EventModel>('save', async function(next) {
  if (typeof this.owner === 'string') {
    this.owner = Types.ObjectId(this.owner);
  }
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/["']/g, '')
      .replace(/[\s_@~]/g, '-');
  }

  next();
})
export class EventModel extends BaseModel<EventModel> {
  @prop({ required: true, ref: User })
  owner: Ref<User>;

  @prop({ required: true })
  @Length(8, 200)
  title: string;

  @prop({ select: false, unique: true })
  slug: string;

  @prop({ required: true, enum: EventType, default: EventType.UltraBike })
  type: EventType;

  @prop({ required: true })
  startLocation: LatLon;

  static get model(): ModelType<EventModel> {
    return new EventModel().getModelForClass(EventModel, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(props: EventModel): InstanceType<EventModel> {
    return new this.model(props);
  }
}
