type TRoutes = {
  distance: number;
  duration: number;
  geometry: string;
  legs: [unknown];
  weight: number;
  weight_name: string;
};

export type TDirection = {
  code: string;
  uuid: string;
  routes: [TRoutes];
  waypoints: [unknown];
};

export type TDirectionResponse = TDirection;
