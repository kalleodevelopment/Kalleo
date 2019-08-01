const twilioSipToCallSip = ({
  SipDomain,
  SipUsername,
  SipCallId,
  SipSourceIp,
}) => ({
  sipDomain: SipDomain,
  sipUsername: SipUsername,
  sipCallId: SipCallId,
  sipSourceIp: SipSourceIp,
});

export default twilioSipToCallSip;
