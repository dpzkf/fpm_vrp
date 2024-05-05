import { TAppRoutes } from "../types";

export const AppRoute: TAppRoutes = {
  App: {
    Dashboard: {
      Root: {
        name: "Dashboard",
        path: "/dashboard",
        key: "dashboard",
        makePath: () => "/dashboard",
      },
    },
  },
} as const;
