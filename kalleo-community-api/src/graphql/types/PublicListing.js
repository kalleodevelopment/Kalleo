export default `
  type PublicListing {
    _id: ID!
    phoneNumber: String!
    type: ListingType!
    carrier: Carrier
    callerIdName: String
    countryCode: String
    lineType: LineType
    businessDetails: BusinessDetails
    consumerDetails: ConsumerDetails
    spamDetails: SpamDetails
    subscriberDetails: SubscriberDetails
    isRegistered: Boolean!
    registeredAt: String
    createdAt: String!
    updatedAt: String!
  }
`;
