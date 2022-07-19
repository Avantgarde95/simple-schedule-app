import "@emotion/react";

declare module "@emotion/react" {
  interface Theme {
    color: {
      primary: string;
      primaryVariant: string;
      secondary: string;
      secondaryVariant: string;
      background: string;
    };
  }
}
