import { TAppRoutes } from "../types";

export const AppRoute: TAppRoutes = {
  App: {
    Dashboard: {
      Root: {
        name: "Dashboard",
        path: "/",
        key: "dashboard",
        makePath: () => "/",
      },
    },
  },
} as const;
