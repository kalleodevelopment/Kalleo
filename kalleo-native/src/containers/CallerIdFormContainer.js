import { connect } from 'react-redux';
import CallerIdForm from '../components/CallerIdForm';
import { updateCallerIdFormField } from '../redux/actions/caller-id-form';
import { updateCallerId } from '../redux/thunks/subscriber';

const mapStateToProps = ({ activeRoute, callerIdForm }) => ({ ...callerIdForm, activeRoute });

const mapDispatchToProps = dispatch => ({
  updateCallerId: subscriber => dispatch(updateCallerId(subscriber)),
  updateField: (field, value) => dispatch(updateCallerIdFormField(field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CallerIdForm);
