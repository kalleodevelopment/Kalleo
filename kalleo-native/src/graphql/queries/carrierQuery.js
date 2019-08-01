import { gql } from 'react-apollo';

export default gql`
query carrier {
  carrier {
    forwardingCode
    unforwardingCode
  }
}
`;
