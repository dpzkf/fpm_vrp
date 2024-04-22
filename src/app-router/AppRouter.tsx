import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Dashboard } from "@pages/Dashboard";

import { AppRoute } from "@constants/routes.ts";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes location={location}>
        <Route path={AppRoute.App.Dashboard.Root.path} element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
