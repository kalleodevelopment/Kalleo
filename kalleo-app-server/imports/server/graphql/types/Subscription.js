export default `
  type Subscription {
    blockedNumbers(authToken: ID!): BlockedNumberMutation

    calls(authToken: ID!): CallMutation

    flaggedSpam(authToken: ID!): FlaggedSpamMutation

    subscriberUpdated(authToken: ID!): Subscriber
  }
`;
