export default `
  type Mutation {
    createOutgoingCall(phoneNumber: PhoneNumber!): Call!

    blockNumber(input: BlockNumberInput!): BlockedNumber!

    flagSpam(input: FlagSpamInput!): FlaggedSpam!

    generateTwilioAccessToken(device: String!): String!

    initiateActivationCall: Boolean!

    initiateDeactivationCall: Boolean!

    initiateVerification(type: String!): Boolean!

    purchaseForwardingNumber: PhoneNumber!

    registerForPushNotifications(deviceToken: String!, device: String!): String!

    sendAuthCode(phoneNumber: PhoneNumber!): Boolean!

    sendActivationText: Subscriber!

    sendDeactivationText: Subscriber!

    sendFeedbackEmail(text: String!): Boolean!

    unblockNumber(phoneNumber: PhoneNumber!): Boolean!

    unflagSpam(phoneNumber: PhoneNumber!): Boolean!

    updateCallerId(input: UpdateCallerIdInput!): Subscriber!

    verifyAuthCode(phoneNumber: PhoneNumber!, authCode: String!): Session!
  }
`;
