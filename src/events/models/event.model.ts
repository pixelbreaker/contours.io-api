import { BaseModel, schemaOptions } from '../../common/models/basemodel.model';
import { Entrant } from '../../entrants/models/entrant.model';
import { EventType } from './Event-type.enum';
import { InstanceType, prop, pre, ModelType, Ref, arrayProp } from 'typegoose';
import { LatLon } from '../../common/types';
import { Length } from 'class-validator';
import { Types } from 'mongoose';
import { User } from '../../users/models/user.model';

@pre<EventModel>('save', async function(next) {
  if (typeof this.organiser === 'string') {
    this.organiser = Types.ObjectId(this.organiser);
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
  organiser: Ref<User>;

  @prop({ required: true })
  @Length(8, 200)
  title: string;

  @prop({ select: false, unique: true })
  slug: string;

  @prop({ required: true, enum: EventType, default: EventType.UltraBike })
  type: EventType;

  @prop({ required: true })
  startLocation: LatLon;

  @arrayProp({ itemsRef: Entrant })
  entrants: Array<Ref<Entrant>>;

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
