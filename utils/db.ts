import mongoose from 'mongoose';
import config from 'config';

mongoose.connect(
  config.get('DB_URL'),
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`Database Connected`);
  }
);
