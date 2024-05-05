import { useToast } from "@hooks/common/useToast";

import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

/**
 * Log a warning and show a toast!
 */
// eslint-disable-next-line
export const rtkQueryErrorLogger: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers
  const { toastError } = useToast();

  if (isRejectedWithValue(action)) {
    const payload = action.payload as { data: { message: string; code: string } };
    toastError((payload as { data: { message: string } }).data?.message || action.error?.message);
  }

  return next(action);
};
