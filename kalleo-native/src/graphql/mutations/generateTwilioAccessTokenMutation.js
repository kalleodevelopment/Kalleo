import { gql } from 'react-apollo';

export default gql`
  mutation generateTwilioAccessToken($device: String!) {
    generateTwilioAccessToken(device: $device)
  }
`;
