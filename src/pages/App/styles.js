import styled from 'styled-components';
import { darken } from 'polished';
import { Range as rcSliderRange } from 'rc-slider';

import ButtonComponent from '../../components/Button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  width: 8rem;
  height: 100vh;
  top: 0;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > * {
    margin: 1.5rem 0;
  }
`;

export const Range = styled(rcSliderRange).attrs({
  railStyle: {
    backgroundColor: '#222',
    borderRadius: 10,
  },
  trackStyle: [{ background: '#fc6963' }],
  handleStyle: [
    { border: 'none', background: '#fc6963' },
    { border: 'none', background: '#fc6963' },
  ],
  vertical: true,
})``;

export const PointReference = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.1);
  p {
    color: #fff;
    font-size: 1.8rem;
  }
  i {
    color: #fc6963;
    pointer-events: all;
    font-size: 5rem;
    margin: 10rem 0;
    -webkit-text-fill-color: #fc6963;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${() => darken(0.05, '#fc6963')};
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
`;

export const Button = styled(ButtonComponent)`
  width: 30rem;
  margin-top: 0.5rem;
  pointer-events: all;
`;

export const Filter = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;

  span {
    color: #fff;
    margin: 10px 0;
    font-size: 13px;
  }
`;
