import React from 'react';
import styled from 'styled-components';

import { Input as StyledInput } from '../../styles/components';

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 2.2rem;

  & > span {
    position: absolute;
    left: 0.5%;
    top: 103%;
    color: red;
    font-size: 1.1rem;
  }
`;

const Input = props => (
  <InputWrapper>
    <StyledInput {...props} />
  </InputWrapper>
);

export default Input;
