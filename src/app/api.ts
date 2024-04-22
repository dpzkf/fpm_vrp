import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const BASE_API = import.meta.env.VITE_BASE_API_URL || "";
const MAPB0X_TOKEN = import.meta.env.VITE_BASE_MAPBOX_TOKEN || "";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${MAPB0X_TOKEN}`);
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ["Taxes", "Customers", "Categories", "Me", "Users"],
  endpoints: () => ({}),
});
