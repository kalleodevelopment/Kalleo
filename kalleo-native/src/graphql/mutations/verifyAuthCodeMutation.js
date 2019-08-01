import { gql } from 'react-apollo';

export default gql`
mutation verifyAuthCode($phoneNumber: PhoneNumber!, $authCode: String!) {
  verifyAuthCode(phoneNumber: $phoneNumber, authCode: $authCode) {
    subscriber {
      _id
      accountStatus
      activationStatus
      deactivationStatus
      email
      firstName
      forwardingCode
      lastName
      onboardStatus
      phoneNumber
      unforwardingCode
    }
    authToken
  }
}
`;
