import { gql } from 'react-apollo';

export default gql`
  query subscriber {
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
  }
`;
