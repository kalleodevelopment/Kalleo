import mongoose from 'mongoose';
import accountStatuses from '../constants/accountStatuses';
import activationStatuses from '../constants/activationStatuses';
import deactivationStatuses from '../constants/deactivationStatuses';
import onboardStatuses from '../constants/onboardStatuses';
import { TWILIO_FORWARDING_NUMBERS } from '../../config';

const schema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  forwardingPhoneNumber: {
    type: String,
  },
  callerIdName: {
    type: String,
  },
  carrierId: {
    type: Number,
  },
  countryCode: {
    type: String,
  },
  accountStatus: {
    type: String,
    enum: {
      values: Object.keys(accountStatuses),
    },
    default: accountStatuses.INCOMPLETE,
  },
  activationStatus: {
    type: String,
    enum: {
      values: Object.keys(activationStatuses),
    },
    default: activationStatuses.UNSTARTED,
  },
  deactivationStatus: {
    type: String,
    enum: {
      values: Object.keys(deactivationStatuses),
    },
    default: activationStatuses.UNSTARTED,
  },
  onboardStatus: {
    type: String,
    enum: {
      values: Object.keys(onboardStatuses),
    },
    default: onboardStatuses.UNSTARTED,
  },
}, {
  timestamps: true,
});

/*
  Assign new subscribers a forwarding phone number
  TODO: This will eventually be managed in the database
*/
schema.pre('save', function (next) {
  // eslint-disable-next-line max-len
  const randomTwilioForwardingNumberIndex = Math.floor(Math.random() * TWILIO_FORWARDING_NUMBERS.length);

  this.forwardingPhoneNumber = TWILIO_FORWARDING_NUMBERS[randomTwilioForwardingNumberIndex];

  next();
});

export default mongoose.model('Subscriber', schema, 'subscribers');
