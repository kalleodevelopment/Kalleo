import gql from 'graphql-tag';
import client from '../client';

const updateSubscriberListing = ({ phoneNumber, firstName, lastName }) => (
  client.mutate({
    mutation: gql`
      mutation updateSubscriberListing($input: UpdateSubscriberListingInput!) {
        updateSubscriberListing(input: $input) {
          phoneNumber
          firstName
          lastName
        }
      }
    `,
    variables: {
      input: {
        phoneNumber,
        firstName,
        lastName,
      },
    },
  })
    .then(({ data }) => data.updateSubscriberListing)
);

export default updateSubscriberListing;
