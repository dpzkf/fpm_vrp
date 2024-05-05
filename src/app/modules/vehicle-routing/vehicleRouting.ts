import { api } from "@app/api.ts";

import { TRetrieveRoutingProblemResponse, TSubmitRoutingProblemBody, TSubmitRoutingProblemResponse } from "./types.ts";

const MAPB0X_TOKEN = import.meta.env.VITE_BASE_MAPBOX_TOKEN || "";

export const vehicleRoutingApi = api.injectEndpoints({
  endpoints: (build) => ({
    getResolvedVehicleRoutingProblem: build.query<TRetrieveRoutingProblemResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        params: {
          access_token: MAPB0X_TOKEN,
        },
      }),
    }),
    submitVehicleRoutingProblem: build.mutation<TSubmitRoutingProblemResponse, TSubmitRoutingProblemBody>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
        params: {
          access_token: MAPB0X_TOKEN,
        },
      }),
    }),
  }),
});

export const { useGetResolvedVehicleRoutingProblemQuery, useSubmitVehicleRoutingProblemMutation } = vehicleRoutingApi;
