import { ETokens } from "../constants/tokens.ts";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/localStorage.ts";
import { Mutex } from "async-mutex";
import { TRefreshSession } from "../types/model.ts";

import { logout, updateToken } from "./modules/me/meSlice.ts";

const BASE_API = import.meta.env.VITE_BASE_API_URL || "";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${getToken(ETokens.AccessToken)}`);
    // headers.set("Refresh-Token", `${getToken(ETokens.RefreshToken)}`);
    return headers;
  },
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-session",
            headers: { "Refresh-Token": getToken(ETokens.RefreshToken) },
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          api.dispatch(updateToken(refreshResult.data as TRefreshSession));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
export const api = createApi({
  baseQuery: baseQueryWithReauth,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ["Taxes", "Customers", "Categories", "Me", "Users"],
  endpoints: () => ({}),
});
