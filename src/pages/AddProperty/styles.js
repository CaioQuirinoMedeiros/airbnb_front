import styled from 'styled-components';
import { darken } from 'polished';

export const Image = styled.div`
  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 5px;
  background-image: ${props => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const DropzoneContainer = styled.div`
  border: 3px dashed ${darken(0.1, '#fc6963')};
  min-height: 120px;
  max-height: 150px;
  overflow: auto;
  font-size: 16px;
  color: #777777;
  text-align: center;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  &:hover p {
    color: #555;
  }
  &:hover {
    border-color: ${darken(0.18, '#fc6963')};
  }
  p {
    width: 100%;
    text-align: center;
    padding: 10px;
    transition: all 0.3s;
  }
`;

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 530px;
    width: 95vw;
    max-height: 98vh;
    padding: 25px;
    overflow: hidden;
    .dropzone {
      width: 100%;
    }
    h1 {
      white-space: nowrap;
      @media (max-width: 382px) {
        font-size: 24px;
      }
    }
    input,
    textarea {
      font-family: inherit;
      resize: none;
      flex: 1;
      border-radius: 5px;
      margin-bottom: 15px;
      padding: 10px;
      color: #777;
      font-size: 15px;
      width: 100%;
      border: 1px solid #ddd;
      &::placeholder {
        color: #999;
      }
    }
    hr {
      margin: 20px 0;
      border: none;
      border-bottom: 1px solid #cdcdcd;
      width: 100%;
    }
    a {
      font-size: 16px;
      font-weight: bold;
      color: #999999;
      text-decoration: none;
    }
    div.actions {
      display: flex;
      margin-top: 15px;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-around;
      button {
        margin-top: 3px;
        color: #fff;
        font-size: 16px;
        background: #fc6963;
        height: 56px;
        width: 150px;
        text-align: center;
        border: 0;
        border-radius: 5px;
        padding: 0 30px;
        cursor: pointer;
        transition: 0.3s;
        > * {
          display: inline-block;
        }
        @media (max-width: 382px) {
          width: 100%;
        }
        &:hover {
          background: ${() => darken(0.08, '#fc6963')};
        }
        &.cancel {
          background: #222;
          &:hover {
            background: ${() => darken(0.08, '#222')};
          }
        }
      }
    }
  }
`;
