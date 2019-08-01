export default `
  type FlaggedSpam {
    _id: ID!
    subscriberId: ID!
    phoneNumber: PhoneNumber!
    callerIdName: String
    type: SpamType!
    createdAt: String!
  }
`;
