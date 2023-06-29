import styled from 'styled-components';

export const LoadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.3); /* semi-transparent white */
`;
