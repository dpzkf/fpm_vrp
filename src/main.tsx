import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import App from "./App.tsx";
import { store } from "./app/store.ts";
import { GlobalStyles } from "./assets/styles/globalStyles.ts";
import { BREAKPOINTS, MANTINE_SCALE, MODAL_CONFIG, MODAL_PROPS } from "./utils";

import "@mantine/core/styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

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
