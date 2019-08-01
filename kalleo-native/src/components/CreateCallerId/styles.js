import EStyleSheet from 'react-native-extended-stylesheet';

const shared = {
  color: '$white',
  lineHeight: 30,
  textAlign: 'center',
};

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '10%',
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    backgroundColor: '$primaryColor',
  },
  header: {
    ...shared,
    fontSize: '$fontXLarge',
  },
  subheader: {
    ...shared,
    fontSize: '$fontLarge',
    marginTop: '4%',
  },
});

export default styles;
