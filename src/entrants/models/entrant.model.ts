import { BaseModel, schemaOptions } from '../../common/models/basemodel.model';
import {
  prop,
  Ref,
  ModelType,
  mapProp,
  InstanceType,
  index,
  pre,
} from 'typegoose';
import { User } from '../../users/models/user.model';
import { RecordedPoint } from '../../common/types';
import { EntrantStatus } from './entrant-status.enum';
import { EventModel } from 'src/events/models/event.model';
import { Types } from 'mongoose';

@pre<Entrant>('save', async function(next) {
  if (typeof this.user === 'string') {
    this.user = Types.ObjectId(this.user);
  }
  if (typeof this.event === 'string') {
    this.event = Types.ObjectId(this.event);
  }
  next();
})
@index({ user: 1, event: 1 }, { unique: true })
export class Entrant extends BaseModel<Entrant> {
  @prop({ required: true })
  user: Ref<User>;

  @prop({ required: true })
  event: Ref<EventModel>;

  @prop({ required: true, default: false })
  approved: boolean;

  @prop({ required: true, enum: EntrantStatus, default: EntrantStatus.PreRace })
  status: EntrantStatus;

  @mapProp({ of: RecordedPoint })
  points?: Map<any, RecordedPoint>;

  static get model(): ModelType<Entrant> {
    return new Entrant().getModelForClass(Entrant, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(props: Entrant): InstanceType<Entrant> {
    return new this.model(props);
  }
}
