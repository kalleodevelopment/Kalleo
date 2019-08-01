import BusinessDetails from './BusinessDetails';
import Carrier from './Carrier';
import ConsumerDetails from './ConsumerDetails';
import PublicListing from './PublicListing';
import LineType from './LineType';
import ListingType from './ListingType';
import LocationTypeDef from './Location';
import { AppMutation, PublicMutation } from './Mutation';
import { AppQuery, PublicQuery } from './Query';
import Reputation from './Reputation';
import Session from './Session';
import SpamDetails from './SpamDetails';
import SubscriberDetails from './SubscriberDetails';
import SubscriberListing from './SubscriberListing';
import UpdateBusinessListingInput from './UpdateBusinessListingInput';
import UpdateConsumerListingInput from './UpdateConsumerListingInput';
import UpdateSubscriberListingInput from './UpdateSubscriberListingInput';

const sharedTypes = [
  BusinessDetails,
  Carrier,
  ConsumerDetails,
  PublicListing,
  LineType,
  ListingType,
  LocationTypeDef,
  Reputation,
  SpamDetails,
  SubscriberDetails,
];

export const appTypes = [
  ...sharedTypes,
  AppMutation,
  AppQuery,
  SubscriberListing,
  UpdateSubscriberListingInput,
];

export const publicTypes = [
  ...sharedTypes,
  PublicMutation,
  PublicQuery,
  Session,
  UpdateBusinessListingInput,
  UpdateConsumerListingInput,
];
