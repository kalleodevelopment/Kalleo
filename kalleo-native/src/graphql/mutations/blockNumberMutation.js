import { gql } from 'react-apollo';

export default gql`
  mutation blockNumber($input: BlockNumberInput!) {
    blockNumber(input: $input) {
      phoneNumber
    }
  }
`;
