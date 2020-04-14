import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const userSchema: Schema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  dateRegistered: {
    type: Date,
    default: new Date(),
  },
});

const user = mongoose.models.user || mongoose.model<IUser>('user', userSchema);
export default user;
