import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  form {
    width: 400px;
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    img {
      width: 100px;
      margin: 10px 0 40px;
    }
    span {
      font-size: 15px;
      color: #ff3333;
      margin-bottom: 15px;
      margin-top: -8px;
      border-radius: 5px;
    }
    input,
    .blank {
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
    .blank {
      visibility: hidden;
    }
    button {
      color: #fff;
      font-size: 16px;
      background: #fc6963;
      height: 56px;
      border: 0;
      border-radius: 5px;
      width: 100%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s;
      &:hover {
        background: ${darken(0.08, "#fc6963")};
      }
    }
    hr {
      margin: 20px 0;
      border: none;
      border-bottom: 1px solid #cdcdcd;
      width: 100%;
    }
    a {
      font-size: 16;
      font-weight: bold;
      color: #999;
      text-decoration: none;
      transition: all 0.3s;
      &:hover {
        color: ${darken(0.1, "#999")};
      }
    }
  }
`;
