import { gql } from 'react-apollo';

export default gql`
  mutation unflagSpam($phoneNumber: PhoneNumber!) {
    unflagSpam(phoneNumber: $phoneNumber)
  }
`;
