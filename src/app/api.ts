import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import qs from "qs";

export const MAPB0X_TOKEN = import.meta.env.VITE_BASE_MAPBOX_TOKEN || "";

const BASE_API = import.meta.env.VITE_BASE_API_URL || "";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: [],
  endpoints: () => ({}),
});
