import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegistrationContainer from '../containers/Registration';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={RegistrationContainer} />
    <Route exact path="/register" component={RegistrationContainer} />
  </Switch>
);

export default Routes;
