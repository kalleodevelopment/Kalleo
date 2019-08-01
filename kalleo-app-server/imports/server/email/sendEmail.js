import { Email } from 'meteor/email';

// TODO: Will we eventually need to leverage their template system?
export default async email => Email.send(email);
