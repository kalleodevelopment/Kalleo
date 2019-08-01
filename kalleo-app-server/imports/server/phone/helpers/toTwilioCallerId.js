const toTwilioCallerId = (callerIdName) => {
  const patterns = [
    ' - ',
    '-',
    ' / ',
    '/',
    ' \\ ',
    '\\',
    ' (',
    ') ',
    /[ ]+/, // whitespace
  ];

  let twilioCallerId = patterns.reduce((callerId, pattern) => (
    callerId.split(pattern).join('_')
  ), callerIdName);

  // Remove everything except alphanumeric characters and underscores
  twilioCallerId = twilioCallerId.replace(/\W/g, '');

  return `client:${twilioCallerId}`;
};

export default toTwilioCallerId;
