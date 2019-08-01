import { updateAuthIsAuthenticated } from '../../../redux/actions/auth';

const mapDispatchToProps = dispatch => ({
  updateAuthIsAuthenticated: isAuthenticated => (
    dispatch(updateAuthIsAuthenticated(isAuthenticated))
  ),
});

export default mapDispatchToProps;
