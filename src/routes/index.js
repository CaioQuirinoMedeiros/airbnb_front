import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalContainer } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';

import PrivateRoute from './private';

import SignUp from '../pages/Auth/SignUp';
import SignIn from '../pages/Auth/SignIn';
import App from '../pages/App';

const Routes = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/app" component={App} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
      <ModalContainer />
    </>
  </BrowserRouter>
);

export default Routes;
