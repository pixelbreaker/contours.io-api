import { BaseModel, schemaOptions } from '../../common/models/basemodel.model';
import { InstanceType, prop, pre, ModelType } from 'typegoose';
import { EventType } from './event-type.enum';

export class Event extends BaseModel<Event> {
  @prop({ required: true })
  owner: string;

  @prop({ required: true })
  title: string;

  @prop({ required: true, enum: EventType, default: EventType.UltraBike })
  type: EventType;

  static get model(): ModelType<Event> {
    return new Event().getModelForClass(Event, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(props: Event): InstanceType<Event> {
    return new this.model(props);
  }
}
