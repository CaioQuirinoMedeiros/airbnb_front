import styled from "styled-components";
import { darken } from "polished";

export const Image = styled.div`
  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 5px;
  background-image: ${props => `url("${props.url}")`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Images = styled.div`
  border: 1px solid #cdcdcd
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
  cursor: pointer;
  transition: all 0.3s;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  width: 530px;
  color: #222;
  h4 {
    margin-bottom: 10px;
    width: 100%;
    font-size: 13px;
  }
  p {
    margin-bottom: 20px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  .footer {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    span {
      color: #fc6963;
      font-size: 22px;
    }
    a,
    button {
      text-decoration: none;
      margin-left: 10px;
      padding: 15px;
      color: #fff;
      font-size: 16px;
      background: #fc6963;
      text-align: center;
      border: 0;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s;
      > * {
        display: inline-block;
      }
      &:hover {
        background: ${() => darken(0.08, "#fc6963")};
      }
    }
  }
  .close {
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
  }
`;
