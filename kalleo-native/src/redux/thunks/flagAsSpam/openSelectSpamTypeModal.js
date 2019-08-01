import { updateIsModalVisible, updateCallerToFlag } from '../../actions/flagAsSpam';

export default ({ item: { callerIdName, listingType, phoneNumber }, recenter }) => (
  async (dispatch) => {
    dispatch(updateIsModalVisible(true));
    dispatch(updateCallerToFlag({
      callerIdName,
      listingType,
      phoneNumber,
      recenter,
    }));
  }
);
