import mongoose, { Schema } from 'mongoose';
import flaggedSpamTypes from '../constants/flaggedSpamTypes';

const { ObjectId } = Schema.Types;

const schema = new mongoose.Schema({
  subscriberId: {
    type: ObjectId,
    required: true,
    index: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    index: true,
  },
  callerIdName: {
    type: String,
    index: true,
  },
  type: {
    type: String,
    enum: {
      values: Object.keys(flaggedSpamTypes),
    },
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString(),
  },
});

schema.index({
  subscriberId: 1,
  phoneNumber: 1,
}, {
  unique: true,
});

export default mongoose.model('FlaggedSpam', schema, 'flaggedSpam');
