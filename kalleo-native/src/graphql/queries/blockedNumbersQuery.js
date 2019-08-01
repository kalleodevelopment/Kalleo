import { gql } from 'react-apollo';

export default gql`
  query blockedNumbers {
    blockedNumbers {
      _id
      callerIdName
      phoneNumber
    }
  }
`;
