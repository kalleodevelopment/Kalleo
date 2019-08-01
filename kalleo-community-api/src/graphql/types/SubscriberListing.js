export default `
  type SubscriberListing {
    _id: ID!
    firstName: String
    lastName: String
    phoneNumber: String!
    callerIdName: String
    carrier: Carrier
    countryCode: String
    isRegistered: Boolean!
    registeredAt: String
    createdAt: String!
    updatedAt: String!
  }
`;
