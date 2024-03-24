import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import userReducer from "./modules/me/meSlice.ts";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  userState: userReducer,
});

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
