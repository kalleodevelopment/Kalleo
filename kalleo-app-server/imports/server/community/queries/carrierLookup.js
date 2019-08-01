import gql from 'graphql-tag';
import client from '../client';

const carrierLookup = id => (
  client.query({
    query: gql`
      query carrier($id: ID!) {
        carrier(id: $id) {
          id
          name
          forwardingCode
          unforwardingCode
          instructions
        }
      }
    `,
    variables: {
      id,
    },
  })
    .then(({ data }) => data.carrier)
);

export default carrierLookup;
