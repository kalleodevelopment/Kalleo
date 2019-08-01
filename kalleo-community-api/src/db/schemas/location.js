import mongoose from 'mongoose';

export default new mongoose.Schema({
  _id: {
    auto: false,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  administrativeArea: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
});
