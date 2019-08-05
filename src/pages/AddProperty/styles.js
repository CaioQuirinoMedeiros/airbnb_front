import styled from 'styled-components';
import { darken } from 'polished';
import CurrencyInput from 'react-currency-input';
import { Form as Unform } from '@rocketseat/unform';

import ButtonComponent from '../../components/Button';
import InputComponent from '../../components/Input';
import { Line as StyledLine, Title as StyledTitle } from '../../styles/components';

export const Image = styled.div`
  width: 8rem;
  height: 8rem;
  margin: 0.5rem;

  border-radius: 5px;
  background-image: ${props => `url("${props.url}")`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const DropzoneContainer = styled.div`
  width: 100%;
  max-height: 12rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1rem;
  margin-bottom: 2rem;
  overflow: auto;

  border: 2px dashed #ddd;
  font-size: 1.6rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover p {
    color: ${darken(0.15, '#999')};
  }
  &:hover {
    border-color: ${darken(0.15, '#ddd')};
  }
  p {
    color: #999;
    width: 100%;
    text-align: center;
    padding: 1rem;
    transition: all 0.3s;
  }
`;

export const Form = styled(Unform)`
  max-width: 53rem;
  width: 95vw;
  max-height: 99vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  overflow: hidden;
`;

export const Title = styled(StyledTitle)``;

export const Line = styled(StyledLine)``;

export const Input = styled(InputComponent)``;

export const PriceInput = styled(CurrencyInput)`
  width: 100%;
  padding: 1rem;
  resize: none;
  margin-bottom: 2.2rem;

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

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled(ButtonComponent)`
  margin-top: 0.5rem;
`;
