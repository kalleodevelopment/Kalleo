import mongoose from 'mongoose';

export default new mongoose.Schema({
  _id: {
    auto: false,
  },
  id: {
    type: String,
  },
  everyoneApiName: {
    type: String,
  },
});
