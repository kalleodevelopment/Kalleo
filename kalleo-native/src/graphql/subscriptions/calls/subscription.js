import { gql } from 'react-apollo';

const subscription = gql`
    subscription calls($authToken: ID!) {
      calls(authToken: $authToken) {
        mutation
        payload {
          _id
          callerIdName
          createdAt
          listingType
          phoneNumber
          status
          subscriberRelations
          type
        }
      }
    }
`;

export default subscription;
