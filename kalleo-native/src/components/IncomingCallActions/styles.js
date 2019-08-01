import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerTop: {
    flexDirection: 'row',
    paddingTop: '15%',
    paddingBottom: '25%',
    justifyContent: 'space-between',
  },
  containerBottom: {
    flexDirection: 'row',
  },
  identifiedLogo: {
    paddingLeft: 10,
  },
  identifiedText: {
    paddingRight: 10,
  },
  hangUpTouchable: {
    borderColor: '$redActionImage',
  },
  answerTouchable: {
    borderColor: '$greenActionImage',
  },
});

export default styles;
