/* eslint-disable prefer-destructuring */
import { Meteor } from 'meteor/meteor';

const settings = Meteor.settings.public;

export const AUTH_CODE_LENGTH = settings.AUTH_CODE_LENGTH || 4;
export const KALLEO_COMMUNITY_URI = settings.KALLEO_COMMUNITY_URI;
