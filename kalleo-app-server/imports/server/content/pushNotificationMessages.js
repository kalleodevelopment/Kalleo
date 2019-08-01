export default {
  BLACKLISTED_CALL: callerIdName => (
    `Your blacklisted caller ${callerIdName} has been blocked from reaching you.`
  ),
  MISSED_CALL: callerIdName => (
    `You have a missed call from ${callerIdName}.`
  ),
  SPAM_CALL: (callerIdName, spamCategory) => (
    `Known spam caller ${callerIdName} ${spamCategory ? `(${spamCategory}) ` : ''}has been blocked from reaching you.`
  ),
  UNIDENTIFIED_CALL: phoneNumber => (
    `Unidentified caller ${phoneNumber} has been directed to your voicemail.`
  ),
};
