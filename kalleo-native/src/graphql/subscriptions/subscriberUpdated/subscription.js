import { gql } from 'react-apollo';

export default gql`
  subscription subscriberUpdated($authToken: ID!) {
    subscriberUpdated(authToken: $authToken) {
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
  }
`;
