import { gql } from 'react-apollo';

const subscription = gql`
    subscription flaggedSpam($authToken: ID!) {
      flaggedSpam(authToken: $authToken) {
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
