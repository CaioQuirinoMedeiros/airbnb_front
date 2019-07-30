import React from 'react';

import Logo from '../../assets/images/logo.svg';
import { Container, Message, Link } from './styles';

const NotFound = () => (
  <Container>
    <img src={Logo} alt="Logo" />
    <Message>Oops, this page no longer exists or never even existed</Message>
    <Link to="/">Redirect me to the right place</Link>
  </Container>
);

export default NotFound;
