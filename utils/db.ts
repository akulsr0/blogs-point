import mongoose from 'mongoose';
import config from 'config';

const dburl: string = process.env.dburl || config.get('DB_URL');

mongoose.connect(
  dburl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`Database Connected`);
  }
);
