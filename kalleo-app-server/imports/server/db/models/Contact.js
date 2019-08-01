import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const schema = new mongoose.Schema({
  subscriberId: {
    type: ObjectId,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
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

export default mongoose.model('Contact', schema, 'contacts');
