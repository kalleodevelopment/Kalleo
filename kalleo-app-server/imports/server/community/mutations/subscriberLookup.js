import gql from 'graphql-tag';
import client from '../client';

const subscriberLookup = phoneNumber => (
  client.mutate({
    mutation: gql`
      mutation subscriberLookup($phoneNumber: String!) {
        subscriberLookup(phoneNumber: $phoneNumber) {
          phoneNumber
          callerIdName
          carrier {
            id
          }
          countryCode
        }
      }
    `,
    variables: {
      phoneNumber,
    },
  })
    .then(({ data }) => data.subscriberLookup)
);

export default subscriberLookup;
