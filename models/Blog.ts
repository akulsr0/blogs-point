import mongoose, { Schema } from 'mongoose';
import IBlog from '../interfaces/blog';

const blogSchema: Schema = new Schema({
  name: String,
  tags: [String],
  link: String,
  slug: String,
  author: Schema.Types.Mixed,
  dateRegistered: {
    type: Date,
    default: new Date(),
  },
});

const blog = mongoose.models.blog || mongoose.model<IBlog>('blog', blogSchema);
export default blog;
