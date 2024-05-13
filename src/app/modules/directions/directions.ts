import { api, MAPB0X_TOKEN } from "../../api.ts";
import { TDirectionResponse } from "./utils";

const BASE_URL = "/directions/v5/mapbox/driving";

export const directionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDirections: build.query<TDirectionResponse, { waypoints: string }>({
      query: ({ waypoints }) => ({
        url: `${BASE_URL}/${waypoints}`,
        params: {
          overview: "full",
          geometries: "polyline",
          access_token: MAPB0X_TOKEN,
        },
      }),
    }),
  }),
});

export const { useGetDirectionsQuery } = directionsApi;
