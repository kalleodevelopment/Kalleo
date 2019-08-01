import updateActiveRoute from '../../../redux/actions/activeRoute';

const mapDispatchToProps = dispatch => ({
  updateActiveRoute: activeRoute => dispatch(updateActiveRoute(activeRoute)),
});

export default mapDispatchToProps;
