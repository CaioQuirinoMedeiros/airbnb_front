import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalContainer } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';

import PrivateRoute from './private';
import Guest from './guest';

import SignUp from '../pages/Auth/SignUp';
import SignIn from '../pages/Auth/SignIn';
import App from '../pages/App';
import NotFound from '../pages/NotFound';

const Routes = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <>
      <Switch>
        <Guest exact path="/" component={SignIn} />
        <Guest path="/signup" component={SignUp} />
        <PrivateRoute path="/app" component={App} />
        <Route path="*" component={NotFound} />
      </Switch>
      <ModalContainer />
    </>
  </BrowserRouter>
);

export default Routes;
