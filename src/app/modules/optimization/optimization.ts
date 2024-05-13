import { api, MAPB0X_TOKEN } from "@app/api.ts";

import { TRetrieveRoutingProblemResponse, TSubmitRoutingProblemBody, TSubmitRoutingProblemResponse } from "./utils";

const BASE_URL = "/optimized-trips/v2";

export const optimizationApi = api.injectEndpoints({
  endpoints: (build) => ({
    getResolvedVehicleRoutingProblem: build.query<TRetrieveRoutingProblemResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_URL}/${id}`,
        params: {
          access_token: MAPB0X_TOKEN,
        },
      }),
    }),
    submitVehicleRoutingProblem: build.mutation<TSubmitRoutingProblemResponse, TSubmitRoutingProblemBody>({
      query: (body) => ({
        url: BASE_URL,
        method: "POST",
        body,
        params: {
          access_token: MAPB0X_TOKEN,
        },
      }),
    }),
  }),
});

export const { useSubmitVehicleRoutingProblemMutation, useLazyGetResolvedVehicleRoutingProblemQuery } = optimizationApi;
