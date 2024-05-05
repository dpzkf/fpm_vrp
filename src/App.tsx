import { Helmet } from "react-helmet";

import { StyledToastContainer } from "@assets/styles/toastStyles.ts";

import { Dashboard } from "@pages/Dashboard";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Helmet>
        <title>DELIVER-ROUTE</title>
        <link rel="icon" href="/vite.svg" />
      </Helmet>
      {/*<AppRouter />*/}
      <Dashboard />
      <StyledToastContainer hideProgressBar />
    </>
  );
}

export default App;
