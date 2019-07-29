import styled from 'styled-components';
import { darken } from 'polished';
import { Range as rcSliderRange } from 'rc-slider';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  width: 80px;
  height: 100vh;
  top: 0;
  right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > * {
    margin: 15px 0;
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
  p {
    color: #fff;
  }
  i {
    color: #fc6963;
    pointer-events: all;
    font-size: 50px;
    margin: 100px 0;
    -webkit-text-fill-color: #fc6963;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${() => darken(0.05, '#fc6963')};
  }
  div {
    button {
      border: none;
      font-size: 15px;
      height: 46px;
      margin: 0 10px;
      background-color: #fc6963;
      color: #ffffff;
      padding: 0 20px;
      border-radius: 3px;
      pointer-events: all;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: ${() => darken(0.06, '#fc6963')};
      }
      &.cancel {
        background: #f1f1f1;
        color: #222;

        &:hover {
          background: ${() => darken(-0.06, '#f1f1f1')};
        }
      }
    }
  }
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
