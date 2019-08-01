const mapStateToPrpps = ({
  subscriber: {
    deactivationStatus,
    unforwardingCode,
  },
}) => ({
  deactivationStatus,
  unforwardingCode,
});

export default mapStateToPrpps;
