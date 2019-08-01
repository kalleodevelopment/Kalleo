import { gql } from 'react-apollo';

export default gql`
  mutation sendAuthCode($phoneNumber: String!, $lineType: LineType!) {
    sendAuthCode(phoneNumber: $phoneNumber, lineType: $lineType)
  }
`;
