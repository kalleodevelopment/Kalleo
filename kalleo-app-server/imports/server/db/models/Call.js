import mongoose, { Schema } from 'mongoose';
import callStatuses from '../constants/callStatuses';
import callTypes from '../constants/callTypes';
import listingTypes from '../constants/listingTypes';
import lineTypes from '../constants/lineTypes';
import subscriberRelations from '../constants/subscriberRelations';

const { ObjectId } = Schema.Types;

const schema = new Schema({
  subscriberId: {
    type: ObjectId,
    index: true,
    sparse: true,
  },
  subscriberForwardedFrom: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: Object.keys(callTypes),
    },
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: Object.keys(callStatuses),
    },
  },
  subscriberRelations: {
    type: [String],
    enum: {
      values: Object.keys(subscriberRelations),
    },
    default: [],
  },
  callerIdName: {
    type: String,
  },
  listingType: {
    type: String,
    enum: {
      values: Object.keys(listingTypes),
    },
    default: listingTypes.UNIDENTIFIED,
  },
  lineType: {
    type: String,
    enum: {
      values: Object.keys(lineTypes).concat(null),
    },
  },
  incomingCallSid: {
    type: String,
    unique: true,
    sparse: true,
  },
  sipDomain: {
    type: String,
  },
  sipUsername: {
    type: String,
  },
  sipCallId: {
    type: String,
  },
  sipSourceIp: {
    type: String,
  },
}, {
  timestamps: true,
});

schema.index({
  subscriberId: 1,
  phoneNumber: 1,
});

function setCallerIdNameIfNull(next) {
  if (!this.callerIdName) {
    this.callerIdName = this.phoneNumber;
  }

  next();
}

schema.pre('save', setCallerIdNameIfNull);

export default mongoose.model('Call', schema, 'calls');
