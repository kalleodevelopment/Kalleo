import { gql } from 'react-apollo';

const subscription = gql`
    subscription blockedNumbers($authToken: ID!) {
      blockedNumbers(authToken: $authToken) {
        mutation
        payload {
          _id
          callerIdName
          phoneNumber
        }
      }
    }
`;

export default subscription;
