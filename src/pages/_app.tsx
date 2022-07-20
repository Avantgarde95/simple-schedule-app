import React, { useState } from "react";
import Modal from "react-modal";
import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import { Global, ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { isDevelopmentMode } from "utils/DebugUtils";
import { globalStyle } from "styles/Global";
import { defaultTheme } from "styles/Theme";

// https://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement("#__next");

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {isDevelopmentMode() && <ReactQueryDevtools initialIsOpen={false} />}
        <ThemeProvider theme={defaultTheme}>
          <Global styles={globalStyle} />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
