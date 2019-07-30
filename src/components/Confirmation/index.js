import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Card, Title, Line, Button,
} from './styles';

const Confirmation = ({ message, confirmation, cancel }) => (
  <Container>
    <Card>
      <Title>{message}</Title>
      <Line />
      <Button color="red" onClick={confirmation}>
        Confirm
      </Button>
      <Button onClick={cancel}>Cancel</Button>
    </Card>
  </Container>
);

Confirmation.propTypes = {
  message: PropTypes.string,
  confirmation: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

Confirmation.defaultProps = {
  message: 'Are you sure you want to proceed?',
};

export default Confirmation;
