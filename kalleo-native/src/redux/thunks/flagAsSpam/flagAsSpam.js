import to from 'await-to-js';
import { resetFlagAsSpam } from '../../actions/flagAsSpam';
import getRelationCallerIdName from '../../../helpers/getRelationCallerIdName';

export default ({ mutate }) => (
  async (dispatch, getState) => {
    const {
      flagAsSpam: {
        selectedSpamType,
        callerToFlag: {
          callerIdName,
          listingType,
          phoneNumber,
          recenter,
        },
      },
    } = getState();

    if (!selectedSpamType) {
      throw new Error('Please select spam type.');
    }

    const [error] = await to(mutate({
      variables: {
        input: {
          phoneNumber,
          callerIdName: getRelationCallerIdName(callerIdName, listingType, phoneNumber),
          type: selectedSpamType,
        },
      },
    }));

    if (!error) {
      recenter();
      dispatch(resetFlagAsSpam());
    }

    throw error;
  }
);
