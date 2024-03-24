import { Suspense } from "react";
import { Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes location={location}></Routes>
    </Suspense>
  );
};

export default AppRouter;
