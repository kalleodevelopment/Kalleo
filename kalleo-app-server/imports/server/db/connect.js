import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

mongoose.Promise = global.Promise;

export default () => (
  mongoose.connect(MONGO_URI, {
    useMongoClient: true,
  })
);
