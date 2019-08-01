import { gql } from 'react-apollo';

export default gql`
  mutation createOutgoingCall($phoneNumber: PhoneNumber!) {
    createOutgoingCall(phoneNumber: $phoneNumber) {
      _id
      subscriberId
      phoneNumber
      type
      status
      subscriberRelations
      callerIdName
      listingType
      createdAt
      updatedAt
    }
  }
`;
