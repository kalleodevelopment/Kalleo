import { gql } from 'react-apollo';

export default gql`
  mutation updateBusinessListing($input: UpdateBusinessListingInput!) {
    updateBusinessListing(input: $input) {
      lineType
      businessDetails {
        name
      }
    }
  }
`;
