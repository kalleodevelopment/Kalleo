import mongoose, { Schema } from 'mongoose';

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
  },
  callerIdName: {
    type: String,
    index: true,
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

export default mongoose.model('BlockedNumber', schema, 'blockedNumbers');
