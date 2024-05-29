import { Helmet } from "react-helmet";

import { StyledToastContainer } from "@assets/styles/toastStyles.ts";

import { Dashboard } from "@pages/Dashboard";

import { VehicleRoutingProvider } from "./context";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Helmet>
        <title>DELIVER-ROUTE</title>
        <link rel="icon" href="/public/dr_logo.svg" />
      </Helmet>
      <VehicleRoutingProvider>
        <Dashboard />
      </VehicleRoutingProvider>
      <StyledToastContainer hideProgressBar />
    </>
  );
}

export default App;
