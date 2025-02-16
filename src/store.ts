import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./services/auth/authSlice";
import { sharebookApi } from "./services/api/sharebookApi";
import { chatReducer } from "./pages/chat/chatSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { mainReducer } from "./mainSlice.ts";

const rootReducer = combineReducers({
  [sharebookApi.reducerPath]: sharebookApi.reducer,
  auth: authReducer,
  chat: chatReducer,
  main: mainReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>["dispatch"];
export type AppStore = ReturnType<typeof setupStore>;

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // Чтобы Redux не ругался на несериализуемый refreshPromise
        serializableCheck: {
          ignoredActions: ["auth/startRefresh", "auth/finishRefresh"],
          ignoredPaths: ["auth.refreshPromise"],
        },
      }).concat(sharebookApi.middleware),
  });
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
