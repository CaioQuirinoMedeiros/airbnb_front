import styled from 'styled-components';
import { darken } from 'polished';
import { Input as UnformInput } from '@rocketseat/unform';

const colors = {
  red: '#fc6963',
  dark: '#222',
  white: '#F2F2F2',
};

export const Button = styled.button.attrs({
  type: 'button',
})`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ color }) => (color === 'white' ? '#444' : '#fff')};
  font-weight: bold;
  font-size: 1.5rem;
  background: ${({ color }) => colors[color]};
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${({ color }) => darken(0.08, colors[color])};
  }
`;

export const CircleButton = styled.button``;

export const Input = styled(UnformInput)`
  width: 100%;
  padding: 1rem;
  resize: none;

  border: 1px solid #ddd;
  border-radius: 5px;
  color: #444;
  font-size: 1.5rem;

  &:hover {
    border-color: ${darken(0.075, '#ddd')};
  }
  &:focus {
    border-color: ${darken(0.15, '#ddd')};
  }
  &:focus:hover {
    border-color: ${darken(0.15, '#ddd')};
  }
  &::placeholder {
    color: #a5a5a5;
  }
`;

export const Title = styled.h1`
  font-size: 2.4rem;
`;

export const Line = styled.hr`
  margin: 20px 0;
  border: none;
  border-bottom: 1px solid #cdcdcd;
  width: 100%;
`;
