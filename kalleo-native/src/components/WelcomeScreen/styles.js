import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const { height, width } = Dimensions.get('window');

const leftRightMargin = width * 0.10;

const shared = {
  backgroundColor: '$transparent',
};

export default EStyleSheet.create({
  container: {
    width,
    paddingLeft: leftRightMargin,
    paddingRight: leftRightMargin,
  },
  headerText: {
    ...shared,
    color: '$primaryColor',
    fontSize: '$fontHeader',
    textAlign: 'center',
    marginTop: height * 0.30,
    marginBottom: '10%',
  },
  subHeaderText: {
    ...shared,
    color: '$primaryTextColor',
    fontSize: '$fontMedium',
    marginTop: '2%',
    textAlign: 'center',
  },
  button: {
    marginTop: '10%',
  },
});
