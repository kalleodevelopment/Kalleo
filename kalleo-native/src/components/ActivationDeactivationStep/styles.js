import EStyleSheet from 'react-native-extended-stylesheet';

const stepContainer = {
  alignItems: 'center',
  backgroundColor: '$primaryColor',
  borderRadius: 20,
  height: 20,
  justifyContent: 'center',
  marginTop: '2%',
  width: 20,
};

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  activationStepContainer: {
    ...stepContainer,
  },
  deactivationStepContainer: {
    ...stepContainer,
    backgroundColor: '#6D6D6D',
  },
  step: {
    color: '$white',
  },
  text: {
    fontSize: '$fontMedium',
    lineHeight: 25,
    marginLeft: '5%',
  },
});
