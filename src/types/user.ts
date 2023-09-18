import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  role: string;
  name: string;
  phoneNumber: string;
}
