export default {
  ACCOUNT_DISABLED: unforwardingCode => (
    `Your kalleo account has been disabled. Please unforward your phone with ${unforwardingCode}`
  ),
  RECEIVED_VOICEMAIL: ({ callerIdName, recordingUrl }) => (
    `You have received a voicemail from ${callerIdName}: ${recordingUrl}`
  ),
  UNREGISTERED_CALL: callerIdName => (
    `The person you are trying to reach uses kalleo, a mobile service that identifies incoming callers. According to our records you are: ${callerIdName}. To update this information and skip the prerecorded messages when calling kalleo users please visit mycallerid.org.`
  ),
  UNIDENTIFIED_CALL: 'The person you are trying to reach uses kalleo, a mobile service that identifies incoming callers. According to our records you do not have a caller ID. To update this information and skip the prerecorded messages when calling kalleo users please visit mycallerid.org.',
};
