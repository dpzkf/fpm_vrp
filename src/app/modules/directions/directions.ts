import { adaptDirectionsData } from "@pages/Dashboard/utils";

import { api, BASE_API, MAPB0X_TOKEN } from "../../api.ts";
import { TRoutes } from "../optimization";
import { TDirectionResponse } from "./utils";

const BASE_URL = "/directions/v5/mapbox/driving";

const fetchMultipleDirections = async (routes: TRoutes[]): Promise<TDirectionResponse[]> => {
  const promises = routes.map(async (el) => {
    const waypoints = adaptDirectionsData(el);
    const response = await fetch(
      `${BASE_API}${BASE_URL}/${waypoints}?overview=full&geometries=polyline6&access_token=${MAPB0X_TOKEN}`,
    );
    return response.json();
  });

  return Promise.all(promises);
};

export const directionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDirections: build.query<TDirectionResponse, { waypoints: string }>({
      query: ({ waypoints }) => ({
        url: `${BASE_URL}/${waypoints}`,
        params: {
          overview: "full",
          geometries: "polyline6",
          access_token: MAPB0X_TOKEN,
        },
      }),
    }),
    getMultipleDirections: build.query<TDirectionResponse[], { routes: TRoutes[] }>({
      queryFn: async ({ routes }) => {
        const results = await fetchMultipleDirections(routes);
        return { data: results };
      },
    }),
  }),
});

export const { useGetDirectionsQuery, useGetMultipleDirectionsQuery } = directionsApi;
