import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '$grayInactive',
    borderRadius: 15,
    height: 15,
    margin: 15,
    width: 15,
  },
  activeIcon: {
    backgroundColor: '$primaryColor',
  },
});

export default styles;
