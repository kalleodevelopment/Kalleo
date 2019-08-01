export interface MongoSubscriber {
  _id: string;
  accountStatus: string;
  activationStatus: string;
  callerIdName: string;
  carrierId: number;
  countryCode: string;
  createdAt: Date;
  deactivationStatus: string;
  onboardStatus: string;
  phoneNumber: string;
  updatedAt: Date;
}

export interface PostgresSubscriber {
  accountStatus: string;
  activationStatus: string;
  carrier: string;
  deactivationStatus: string;
}

export interface MongoCall {
  _id: string;
  listingType: string;
  status: string;
  type: string;
  subscriberForwardedFrom?: string;
}

export interface PostgresCall {
  listingType: string;
  status: string;
  type: string;
  subscriberForwardedFrom?: string;
  callId: string;
}

export interface Listing {
  _id: string;
  lineType: string;
  type: string;
  isRegistered?: boolean;
}
