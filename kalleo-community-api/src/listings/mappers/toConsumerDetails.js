// eslint-disable-next-line camelcase
const toConsumerDetails = ({ expanded_name = {} }) => ({
  consumerDetails: {
    firstName: expanded_name.first,
    lastName: expanded_name.last,
  },
});

export default toConsumerDetails;
