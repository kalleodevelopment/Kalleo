export const AppMutation = `
  type Mutation {
    lookup(phoneNumber: String!): PublicListing!

    subscriberLookup(phoneNumber: String!): SubscriberListing!

    updateSubscriberListing(input: UpdateSubscriberListingInput!): SubscriberListing!
  }
`;

export const PublicMutation = `
  type Mutation {
    lookup(phoneNumber: String!): PublicListing!

    sendAuthCode(phoneNumber: String!, lineType: LineType!): Boolean!

    verifyAuthCode(phoneNumber: String!, authCode: String!): Session!

    updateBusinessListing(input: UpdateBusinessListingInput!): PublicListing!

    updateConsumerListing(input: UpdateConsumerListingInput!): PublicListing!
  }
`;
