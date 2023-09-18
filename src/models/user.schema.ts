import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'User must provide an email'],
  },
  password: { type: String, required: [true, 'User must provide a password'] },
  name: { type: String, required: [true, 'User must provide a name'] },
  status: { type: String, enum: ['available', 'unavailable'] },
  phoneNumber: {
    type: String,
    required: [true, 'User must provide a phoneNumber'],
  },
  role: { type: String, enum: ['driver', 'client'], default: 'client' },
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
