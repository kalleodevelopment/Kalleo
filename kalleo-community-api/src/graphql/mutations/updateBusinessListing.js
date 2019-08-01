import { updateAsRegisteredListing, listingTypes } from '../../db';
import { handleGraphqlError, to } from '../../logging';

const updateBusinessListing = async (obj, { input }, { user }) => {
  const { name, lineType } = input;
  const { phoneNumber } = user;

  const [error, updatedBusiness] = await to(updateAsRegisteredListing({
    phoneNumber,
  }, {
    lineType,
    type: listingTypes.BUSINESS,
    callerIdName: name,
    businessDetails: {
      name,
    },
  }));

  handleGraphqlError(error, 'Failed to update business listing');

  return updatedBusiness;
};

export default updateBusinessListing;
