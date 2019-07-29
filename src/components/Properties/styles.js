import styled from 'styled-components';
import { darken } from 'polished';

export default styled.div`
  background: #fc6963;
  border: 0;
  border-radius: 5px;
  display: flex;
  transition: all 0.2s;
  &:hover {
    background: ${darken(0.08, '#fc6963')};
  }
  .link {
    color: #fff;
    font-size: 13px;
    padding: 5px;
    text-decoration: none;
  }
`;
