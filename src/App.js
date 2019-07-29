import React from 'react';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <>
    <GlobalStyle />
    <Routes />
    <ToastContainer toastClassName="custom_toast" autoClose={2000} hideProgressBar />
  </>
);

export default App;
