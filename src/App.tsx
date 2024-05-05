import { Helmet } from "react-helmet";

import { StyledToastContainer } from "@assets/styles/toastStyles.ts";

import AppRouter from "./app-router/AppRouter";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Helmet>
        <title>DELIVER-ROUTE</title>
        <link rel="icon" href="/vite.svg" />
      </Helmet>
      <AppRouter />
      <StyledToastContainer hideProgressBar />
    </>
  );
}

export default App;
