export default `
  type Subscriber {
    _id: ID!
    accountStatus: AccountStatus!
    activationStatus: ActivationStatus!
    callerIdName: String
    countryCode: String
    deactivationStatus: DeactivationStatus!
    email: String
    firstName: String
    forwardingCode: String
    forwardingPhoneNumber: PhoneNumber
    lastName: String
    onboardStatus: OnboardStatus!
    phoneNumber: PhoneNumber!
    unforwardingCode: String
    createdAt: String!
    updatedAt: String!
  }
`;
