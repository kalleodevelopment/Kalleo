import sendEmail from '../../../email';
import {
  FEEDBACK_EMAIL_RECIPIENT,
  FEEDBACK_EMAIL_BBC_RECIPIENT,
} from '../../../config';
import { handleGraphqlError, to } from '../../../logging';

export default async (obj, { text }, { subscriber }) => {
  const email = {
    text,
    to: FEEDBACK_EMAIL_RECIPIENT,
    bcc: FEEDBACK_EMAIL_BBC_RECIPIENT,
    from: subscriber.email,
    subject: 'kalleo Feedback',
  };

  const [error] = await to(sendEmail(email));

  handleGraphqlError(error, 'Failed to send feedback message');

  return true;
};
