import { Typegoose, prop, pre } from 'typegoose';

@pre('findOneAndUpdate', function() {
  this._update.updatedAt = new Date(Date.now());
})
export class BaseModel<T> extends Typegoose {
  _id: string;

  @prop({ select: false })
  createdAt: Date;

  @prop({ select: false })
  updatedAt: Date;
}

export const schemaOptions: object = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
};
