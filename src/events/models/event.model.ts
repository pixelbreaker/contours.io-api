import { BaseModel, schemaOptions } from '../../common/models/basemodel.model';
import { InstanceType, prop, pre, ModelType } from 'typegoose';
import { EventType } from './Event-type.enum';

@pre('save', async function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/["']/g, '')
      .replace(/[\s_@~]/g, '-');
  }

  next();
})
export class EventModel extends BaseModel<EventModel> {
  @prop({ required: true })
  owner: string;

  @prop({ required: true })
  title: string;

  @prop({ select: false })
  slug?: string;

  @prop({ required: true, enum: EventType, default: EventType.UltraBike })
  type: EventType;

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
