import { api, MAPB0X_TOKEN } from "../../api.ts";
import { TReverseGeocodingResponse } from "./utils";

const BASE_URL = "/search/geocode/v6";

export const geocodingApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReverseGeocoding: build.query<TReverseGeocodingResponse, { longitude: number; latitude: number }>({
      query: ({ latitude, longitude }) => ({
        url: `${BASE_URL}/reverse`,
        params: {
          latitude,
          longitude,
          types: "address",
          access_token: MAPB0X_TOKEN,
        },
      }),
    }),
  }),
});

export const { useLazyGetReverseGeocodingQuery } = geocodingApi;
