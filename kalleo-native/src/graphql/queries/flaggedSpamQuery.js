import { gql } from 'react-apollo';

export default gql`
  query flaggedSpam {
    flaggedSpam {
      _id
      callerIdName
      phoneNumber
    }
  }
`;
