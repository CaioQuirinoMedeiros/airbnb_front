import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;

  background: #f5f5f5;

  img {
    width: 10rem;
    margin-bottom: 2rem;
  }
`;

export const Message = styled.h1`
  font-size: 2.6rem;
  margin: 2rem;
  text-align: center;
`;

export const Link = styled(RouterLink)`
  color: #fc6963;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    color: ${darken(0.12, '#fc6963')};
  }
`;
