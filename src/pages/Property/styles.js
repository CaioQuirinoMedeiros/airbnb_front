import styled from 'styled-components';

import ButtonComponent from '../../components/Button';
import { Line as StyledLine, Title as StyledTitle } from '../../styles/components';

export const Image = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer',
})`
  margin: 5px;
  transition: all 0.2s;
  &:hover {
    opacity: 0.7;
  }

  div {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    background-image: ${props => `url("${props.href}")`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
`;

export const Images = styled.div`
  border: 1px solid #cdcdcd;
  max-height: 150px;
  width: 100%;
  overflow: auto;
  font-size: 16px;
  color: #777777;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
  transition: all 0.3s;
`;

export const Container = styled.div`
  width: 53rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  color: #222;
  position: relative;
`;

export const Title = styled(StyledTitle)``;

export const Line = styled(StyledLine)``;

export const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  h4 {
    margin-bottom: 0.5rem;
    font-size: 1.6rem;
  }

  p {
    font-size: 1.4rem;
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: #fc6963;
    font-size: 3rem;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const Button = styled(ButtonComponent)`
  margin-left: 0.5rem;
  width: 8rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  padding: 18px;
  font-size: 18px;
  color: #777;
  transition: all 0.2s;

  &:hover {
    color: #111;
  }
`;
