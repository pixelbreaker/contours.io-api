import { Typegoose, ModelType, InstanceType } from 'typegoose';
import { Types } from 'mongoose';

export abstract class BaseService<T extends Typegoose> {
  protected _model: ModelType<T>;

  async findAll(
    filter = {},
    selectFields = '',
  ): Promise<Array<InstanceType<T>>> {
    return this._model
      .find(filter)
      .select(selectFields.trim())
      .exec();
  }

  async findOne(filter = {}, selectFields = ''): Promise<InstanceType<T>> {
    return this._model
      .findOne(filter)
      .select(selectFields.trim())
      .exec();
  }

  async findById(id: string): Promise<InstanceType<T>> {
    return this._model.findById(this.toObjectId(id)).exec();
  }

  async create(
    item: InstanceType<T>,
    selectFields = '',
  ): Promise<InstanceType<T>> {
    const newItem = await this._model.create(item);

    return this._model.findOne({ _id: newItem._id }).select(selectFields);
  }

  async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
    return this._model
      .findByIdAndUpdate(this.toObjectId(id), item, { new: true })
      .exec();
  }

  async delete(id: string): Promise<InstanceType<T>> {
    return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
  }

  async clearAll(filter = {}): Promise<void> {
    return this._model.deleteMany(filter).exec();
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }
}
