import { gql } from 'react-apollo';

export default gql`
  mutation sendFeedbackEmail($text: String!) {
    sendFeedbackEmail(text: $text)
  }
`;
