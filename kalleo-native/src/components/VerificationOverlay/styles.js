import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '$white',
    flex: 1,
    left: 0,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
  },
});
