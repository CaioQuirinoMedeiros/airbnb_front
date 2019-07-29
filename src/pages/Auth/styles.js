import styled from 'styled-components';
import { darken } from 'polished';
import { Form as Unform, Input as UnformInput } from '@rocketseat/unform';
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-image: linear-gradient(rgba(0, 0, 0, 0.92), rgba(0, 0, 0, 0.92)),
    url('/background.jpeg');
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

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  position: relative;

  & > span {
    position: absolute;
    left: 0.5%;
    top: 105%;
    color: red;
    font-size: 1.1rem;
  }
`;

export const Input = styled(UnformInput)`
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.2rem;

  border: 1px solid #ddd;
  border-radius: 5px;
  color: #777;
  font-size: 1.5rem;

  &::placeholder {
    color: #999;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  background: #fc6963;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${darken(0.08, '#fc6963')};
  }
`;

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
