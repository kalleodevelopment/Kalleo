import { gql } from 'react-apollo';

export default gql`
mutation updateCallerId($input: UpdateCallerIdInput!) {
  updateCallerId(input: $input) {
    firstName
    lastName
    email
    phoneNumber
    onboardStatus
    accountStatus
  }
}
`;
