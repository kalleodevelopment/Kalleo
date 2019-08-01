import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    backgroundColor: '$white',
    height: '75%',
    width: '95%',
    '@media android': {
      height: '80%',
    },
  },
  modalHeader: {
    alignItems: 'center',
    backgroundColor: '$primaryColor',
    justifyContent: 'center',
    padding: '5%',
  },
  modalHeaderText: {
    color: '$white',
    fontSize: '$fontLarge',
    paddingTop: '10%',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  submitButtonContainer: {
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '5%',
  },
});

