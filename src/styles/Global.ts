import { css } from "@emotion/react";

import { fadeInStyle } from "styles/Mixins";

export const globalStyle = css`
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    font-family: "Noto Sans KR", sans-serif;
    font-size: 16px;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  .ReactModal__Overlay {
    ${fadeInStyle}
  }
`;
