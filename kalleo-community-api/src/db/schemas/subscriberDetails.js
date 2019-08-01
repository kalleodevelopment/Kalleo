import mongoose from 'mongoose';

export default new mongoose.Schema({
  _id: {
    auto: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
