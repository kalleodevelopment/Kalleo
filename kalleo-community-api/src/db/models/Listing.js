import mongoose from 'mongoose';
import collectionNames from '../constants/collectionNames';
import lineTypes from '../constants/lineTypes';
import listingTypes from '../constants/listingTypes';
import carrier from '../schemas/carrier';
import businessDetails from '../schemas/businessDetails';
import consumerDetails from '../schemas/consumerDetails';
import spamDetails from '../schemas/spamDetails';
import subscriberDetails from '../schemas/subscriberDetails';

const schema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: {
      values: Object.keys(listingTypes),
    },
    default: listingTypes.UNIDENTIFIED,
    index: true,
  },
  callerIdName: {
    type: String,
  },
  countryCode: {
    type: String,
  },
  lineType: {
    type: String,
    enum: {
      values: Object.keys(lineTypes),
    },
  },
  carrier,
  businessDetails,
  consumerDetails,
  spamDetails,
  subscriberDetails,
  isRegistered: {
    type: Boolean,
    default: false,
    index: true,
  },
  registeredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date().toISOString(),
  },
});

schema.pre('findOneAndUpdate', function (next) {
  this.getUpdate().updatedAt = new Date().toISOString();

  next();
});

export default mongoose.model('Listing', schema, collectionNames.listings);
