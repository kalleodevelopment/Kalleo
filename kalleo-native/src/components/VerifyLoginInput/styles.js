import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const { height, width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '$grayBackgroundColor',
    fontFamily: '$fontFamily',
    height: height * 0.07,
    textAlign: 'center',
    width: width * 0.12,
  },
});

export default styles;
