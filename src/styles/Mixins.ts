import { css, keyframes } from "@emotion/react";

export const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeInStyle = css`
  opacity: 0;
  animation: ${fadeInAnimation} 1s forwards;
`;
