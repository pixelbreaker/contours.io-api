import { BaseService } from '../common/base.service';
import { EventModel } from './models/event.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';

@Injectable()
export class EventsService extends BaseService<EventModel> {
  constructor(
    @InjectModel(EventModel.modelName)
    private readonly _eventModel: ModelType<EventModel>,
  ) {
    super();
    this._model = this._eventModel;
  }

  async findOne(filter = {}, selectFields = ''): Promise<EventModel> {
    return this._model
      .findOne(filter)
      .populate('owner', 'username firstname lastname')
      .select(selectFields.trim())
      .exec();
  }
}
