import styled from 'styled-components';

import ButtonComponent from '../Button';
import { Line as StyledLine, Title as StyledTitle } from '../../styles/components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.9);
`;

export const Card = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;

  border-radius: 5px;
  background: #fff;
`;

export const Title = styled(StyledTitle)`
  font-size: 2rem;
`;

export const Line = styled(StyledLine)``;

export const Button = styled(ButtonComponent)`
  margin-top: 0.5rem;
`;
