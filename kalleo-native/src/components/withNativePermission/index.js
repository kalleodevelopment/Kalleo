import React, { Component } from 'react';
import { Platform } from 'react-native';
import Permissions from 'react-native-permissions';
import { handleError, to } from '../../helpers/handleError';
import { actions, requiredPermissions, statuses } from '../../constants/native-permissions';

const withNativePermission = (WrappedComponent, { type, unauthorizedMessage }) => (
  class WithNativePermissionsHOC extends Component {
    constructor(props) {
      super(props);

      const permissionsNotRequired = Platform.OS === 'ios' && type === requiredPermissions.CALL_PHONE.type;

      this.state = {
        permissionsNotRequired,
        permissionsGranted: permissionsNotRequired,
      };
    }

    componentDidMount = async () => {
      const { permissionsNotRequired } = this.state;

      if (!permissionsNotRequired) {
        this.handlePermissionResponse(await to(Permissions.check(type)));
      }
    }

    componentWillUmount = () => {
      this.setState({ permissionsGranted: false });
    }

    handlePermissionResponse = ([error, result], action = actions.CHECK) => {
      if (error) {
        handleError(error);
      } else if (result !== statuses.AUTHORIZED && action === actions.CHECK) {
        this.requestPermissions();
      } else if (result !== statuses.AUTHORIZED && action === actions.REQUEST) {
        handleError({
          message: unauthorizedMessage,
        });
      } else {
        this.setState({ permissionsGranted: true });
      }
    }

    requestPermissions = async () => {
      this.handlePermissionResponse(await to(Permissions.request(type)), actions.REQUEST);
    }

    render = () => (
      <WrappedComponent
        requestPermissions={this.requestPermissions}
        {...this.props}
        {...this.state}
      />
    )
  }
);

export default withNativePermission;
