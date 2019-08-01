import { gql } from 'react-apollo';

export default gql`
  mutation unblockNumber($phoneNumber: PhoneNumber!) {
    unblockNumber(phoneNumber: $phoneNumber)
  }
`;
