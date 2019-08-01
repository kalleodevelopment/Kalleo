import twilioClient from './client';

const createCall = ({ from, to, url }) => (
  twilioClient.calls.create({ from, to, url })
);

export default createCall;
