import Contact from '../models/Contact';

const findContact = ({ subscriberId, phoneNumber }) => (
  Contact.findOne({
    subscriberId,
    phoneNumber,
  })
    .lean()
    .exec()
);

export default findContact;
