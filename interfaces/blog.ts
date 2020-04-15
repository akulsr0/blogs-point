import { Document } from 'mongoose';
export default interface IUser extends Document {
  name: string;
  tags: [string];
  link: string;
  slug: string;
  author: { _id: string; name: string; username: string; email: string };
  dateRegistered: Date;
}
