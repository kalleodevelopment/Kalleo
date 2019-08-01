import moment from 'moment';
import { recentCallDateFormats } from '../constants/recent-calls';

export default (date) => {
  const momentizedDate = moment(new Date(date).toISOString(), moment.ISO_8601);
  const dateDifference = moment().diff(momentizedDate, 'days');

  if (dateDifference === 0) {
    return momentizedDate.format(recentCallDateFormats.today);
  }

  if (dateDifference < 8) {
    return momentizedDate.format(recentCallDateFormats.thisWeek);
  }

  return momentizedDate.format(recentCallDateFormats.older);
};
