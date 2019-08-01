import { gql } from 'react-apollo';

export default gql`
  query recentCalls {
    recentCalls {
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
`;
