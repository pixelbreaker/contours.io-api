import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { BCRYPT_SALT_ROUNDS } from '../../constants';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS);
  this.password = hash;

  next();
});
