import React from 'react';
import PropTypes from 'styled-components';

import ReactLoading from 'react-loading';
import { Button as StyledButton } from '../../styles/components';

const Button = ({
  loading, children, color, ...rest
}) => (
  <StyledButton color={color || 'white'} {...rest}>
    {loading ? <ReactLoading width={40} type="bubbles" /> : children}
  </StyledButton>
);

Button.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  loading: false,
  children: 'Button',
  color: 'white',
};

export default Button;
