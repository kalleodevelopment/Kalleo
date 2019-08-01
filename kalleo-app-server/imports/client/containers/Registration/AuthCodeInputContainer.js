import { connect } from 'react-redux';
import AuthCodeInput from '../../components/Registration/AuthCodeInput';
import { setAuthCodeDigit } from '../../redux';

const mapStateToProps = ({ authCodeDigits }) => ({
  authCodeDigits,
});

const mapDispatchToProps = dispatch => ({
  onChangeDigit: ({ digit, index }) => dispatch(setAuthCodeDigit({ digit, index })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthCodeInput);
