import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

import 'react-toastify/dist/ReactToastify.min.css';
import 'rc-slider/assets/index.css';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: 0;

    &::-webkit-scrollbar {
      width: 0.8rem;
    }

    &::-webkit-scrollbar-track {
      background: #eee;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }

    &::-webkit-scrollbar-thumb {
      background: #fc6963;
      outline: none;

      &:hover {
        background: ${darken(0.08, '#fc6963')};
      }
    }
  }

  body, html {
    background: #eee;
    font-family: 'Roboto', 'Helvetica', Arial, sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    height: 100%;
    width: 100%;
  }

  html {
    font-size: 62.5%;

    @media only screen and (max-width: 56em) {
      font-size: 60%;
    }
    @media only screen and (max-width: 37.5em) {
      font-size: 56%;
    }
    @media only screen and (max-width: 25em) {
      font-size: 50%;
    }
  }

  button {
    background: none;
    outline: none;
    border: none;

    &:hover {
      cursor: pointer;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input,
  textarea {
    font-family: inherit;
    outline: none;
  }

  .custom_toast {
    font-size: 1.6rem;
    border-radius: 5px !important;
  }
`;

export default GlobalStyle;
