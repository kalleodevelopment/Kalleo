import mongoose from 'mongoose';
import { MONGODB_URI } from '../config';

mongoose.Promise = global.Promise;

export default () => (
  mongoose.connect(MONGODB_URI, {
    useMongoClient: true,
  })
);
