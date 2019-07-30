import React from 'react';
import PropTypes from 'prop-types';

import Button from './styles';

const BigButton = ({ children, color, ...props }) => (
  <Button type="button" color={color} {...props}>
    {children}
  </Button>
);

BigButton.propTypes = {
  children: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  props: PropTypes.shape(),
};

BigButton.defaultProps = {
  props: {},
};

export default BigButton;
