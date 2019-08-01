import { gql } from 'react-apollo';

export default gql`
  mutation sendAuthCode($phoneNumber: PhoneNumber!) {
    sendAuthCode(phoneNumber: $phoneNumber)
  }
`;
