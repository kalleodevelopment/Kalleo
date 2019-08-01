import mongoose from 'mongoose';
import reputation from './reputation';

export default new mongoose.Schema({
  _id: {
    auto: false,
  },
  reputation,
  volumeScore: {
    type: Number,
    min: 1,
    max: 4,
  },
  reportCount: {
    type: Number,
    min: 0,
    required: true,
  },
});
