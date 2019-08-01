export default `
  type Call {
    _id: ID!
    subscriberId: ID!
    phoneNumber: PhoneNumber!
    type: CallType!
    status: CallStatus
    subscriberRelations: [SubscriberRelation]!
    callerIdName: String
    listingType: ListingType!
    createdAt: String!
    updatedAt: String!
  }
`;
