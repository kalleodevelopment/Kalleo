import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import { cleanPhoneNumber } from '../../phone';

const PhoneNumber = new GraphQLScalarType({
  name: 'PhoneNumber',
  description: 'Phone number custom scalar type (accepts strings from client)',
  parseValue: cleanPhoneNumber,
  serialize: value => value,
  parseLiteral({ kind, value }) {
    switch (kind) {
      case Kind.STRING:
        return cleanPhoneNumber(value);
      default:
        throw new GraphQLError(`Query error: Only accepts strings. Received ${kind}`);
    }
  },
});

export default PhoneNumber;
