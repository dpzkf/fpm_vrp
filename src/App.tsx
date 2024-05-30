import { Helmet } from "react-helmet";

import { StyledToastContainer } from "@assets/styles/toastStyles.ts";

import { Dashboard } from "@pages/Dashboard";

import { VehicleRoutingProvider } from "./context";

function App() {
  return (
    <>
      <Helmet>
        <title>DELIVER-ROUTE</title>
        <link rel="icon" href="/fpm_vrp/dr_logo.svg" />
      </Helmet>
      <VehicleRoutingProvider>
        <Dashboard />
      </VehicleRoutingProvider>
      <StyledToastContainer hideProgressBar />
    </>
  );
}

export default App;
