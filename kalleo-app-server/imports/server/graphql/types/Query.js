export default `
  type Query {
    blockedNumbers: [BlockedNumber]!

    carrier: Carrier

    flaggedSpam: [FlaggedSpam]!

    recentCalls: [Call]!

    subscriber: Subscriber
  }
`;
