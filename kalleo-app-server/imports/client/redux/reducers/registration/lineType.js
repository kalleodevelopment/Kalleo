import actionTypes from '../../constants/actionTypes';
import lineTypes from '../../constants/lineTypes';

const lineType = (state = lineTypes.MOBILE, action) => {
  switch (action.type) {
    case actionTypes.SET_REGISTRATION_LINE_TYPE:
      return action.lineType;
    default:
      return state;
  }
};

export default lineType;
