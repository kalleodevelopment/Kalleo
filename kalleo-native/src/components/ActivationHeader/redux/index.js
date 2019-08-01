const mapStateToProps = ({
  subscriber: {
    accountStatus,
    activationStatus,
    forwardingCode,
  },
}) => ({
  accountStatus,
  activationStatus,
  forwardingCode,
});

export default mapStateToProps;

