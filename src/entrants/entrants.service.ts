import { BaseService } from '../common/base.service';
import { Entrant } from './models/entrant.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';

@Injectable()
export class EntrantsService extends BaseService<Entrant> {
  constructor(
    @InjectModel(Entrant.modelName)
    private readonly _entrantModel: ModelType<Entrant>,
  ) {
    super();
    this._model = this._entrantModel;
  }
}
