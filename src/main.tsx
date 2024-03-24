import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import "@mantine/core/styles.css";
import "./index.css";
import { GlobalStyles } from "./assets/styles/globalStyles.ts";

import { BREAKPOINTS, MANTINE_SCALE } from "./constants";
import { MODAL_CONFIG, MODAL_PROPS } from "./constants/modalConfig.ts";

const theme = createTheme({
  scale: MANTINE_SCALE,
  breakpoints: BREAKPOINTS,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <ModalsProvider modals={MODAL_CONFIG} modalProps={MODAL_PROPS}>
          <BrowserRouter>
            <GlobalStyles />
            <App />
          </BrowserRouter>
        </ModalsProvider>
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
);
