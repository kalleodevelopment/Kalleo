import { gql } from 'react-apollo';

export default gql`
  mutation flagSpam($input: FlagSpamInput!) {
    flagSpam(input: $input) {
      _id
    }
  }
`;
