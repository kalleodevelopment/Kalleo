import { gql } from 'react-apollo';

export default gql`
  mutation updateConsumerListing($input: UpdateConsumerListingInput!) {
    updateConsumerListing(input: $input) {
      lineType
      consumerDetails {
        firstName
        lastName
      }
    }
  }
`;
