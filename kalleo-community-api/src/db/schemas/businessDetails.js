import mongoose from 'mongoose';
import location from './location';

export default new mongoose.Schema({
  _id: {
    auto: false,
  },
  name: {
    type: String,
  },
  location,
});
