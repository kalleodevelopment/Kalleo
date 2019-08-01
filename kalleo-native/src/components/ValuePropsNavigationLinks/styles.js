import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  next: {
    color: '$primaryColor',
    paddingLeft: '10%',
    fontSize: '$fontMedium',
  },
  skip: {
    color: '$grayInactive',
    fontSize: '$fontMedium',
  },
});

export default styles;
