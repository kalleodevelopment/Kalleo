import gql from 'graphql-tag';
import client from '../client';

const lookup = phoneNumber => (
  client.mutate({
    mutation: gql`
      mutation lookup($phoneNumber: String!) {
        lookup(phoneNumber: $phoneNumber) {
          phoneNumber
          type
          lineType
          callerIdName
          spamDetails {
            reputation {
              category
            }
          }
          isRegistered
        }
      }
    `,
    variables: {
      phoneNumber,
    },
  })
    .then(({ data }) => data.lookup)
);

export default lookup;
