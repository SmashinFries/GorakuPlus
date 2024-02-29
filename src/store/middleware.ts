import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit"
import { sendErrorMessage } from "@/utils/toast"

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      sendErrorMessage('Network error!', 'data' in action.error
      ? (action.error.data as { message: string }).message
      : action.error.message)
    }

    return next(action)
  }