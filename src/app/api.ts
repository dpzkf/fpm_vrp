import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { ETokens } from "../constants/tokens.ts";
import { getToken } from "../utils/localStorage.ts";

const BASE_API = import.meta.env.VITE_BASE_API_URL || "";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${getToken(ETokens.AccessToken)}`);
    // headers.set("Refresh-Token", `${getToken(ETokens.RefreshToken)}`);
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
