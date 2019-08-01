import { gql } from 'react-apollo';

export default gql`
  mutation initiateVerification($type: String!) {
    initiateVerification(type: $type)
  }
`;
