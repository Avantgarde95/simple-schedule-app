import "@emotion/react";

declare module "@emotion/react" {
  interface Theme {
    color: {
      primary: string;
      stroke: string;
      background: string;
    };
  }
}
