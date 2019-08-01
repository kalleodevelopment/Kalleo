import { gql } from 'react-apollo';

export default gql`
  mutation verifyAuthCode($phoneNumber: String!, $authCode: String!) {
    verifyAuthCode(phoneNumber: $phoneNumber, authCode: $authCode) {
      listing {
        type
        callerIdName
        lineType
        businessDetails {
          name
        }
        consumerDetails {
          firstName
          lastName
        }
      }
      authToken
    }
  }
`;
