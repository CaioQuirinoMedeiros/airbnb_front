import styled from 'styled-components';
import { darken } from 'polished';
import { Form as Unform } from '@rocketseat/unform';
import { Link as RouterLink } from 'react-router-dom';

import ButtonComponent from '../../components/Button';
import InputComponent from '../../components/Input';
import { Line as StyledLine } from '../../styles/components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/background.jpeg');
  background-size: cover;
  background-position: center;
`;

export const Form = styled(Unform)`
  width: 40rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background: #fff;
  padding: 2rem;
  border-radius: 5px;

  img {
    width: 8rem;
    margin-bottom: 3rem;
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
`;

export const Input = styled(InputComponent)``;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Button = styled(ButtonComponent)``;

export const Line = styled(StyledLine)``;

export const Link = styled(RouterLink)`
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  color: #999;
  transition: all 0.3s;

  &:hover {
    color: ${darken(0.1, '#999')};
  }
`;
