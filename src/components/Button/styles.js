import styled from 'styled-components';
import { darken } from 'polished';

export default styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background-color: ${({ color }) => color};
  color: #fff;
  cursor: pointer;
  transition: all 0.25s;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 22px;
  }
  &:hover {
    background-color: ${({ color }) => darken(0.09, color)};
  }
  &:active {
    background-color: ${({ color }) => darken(0.07, color)};
  }
`;
