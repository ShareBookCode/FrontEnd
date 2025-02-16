import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  finishRefresh,
  logout,
  setAccessToken,
  setReturnCookie,
  startRefresh,
} from "./authSlice";
import type { RootState } from "../../store";
import qs from "qs";

// const baseUrl =  import.meta.env.PROD ? "https://194.67.125.199:8443/" : "https://frontend-wmyr.onrender.com/"
// Исходный fetchBaseQuery
const rawBaseQuery = fetchBaseQuery({
  mode: "cors",
  baseUrl: "https://frontend-wmyr.onrender.com/api/",
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const state = api.getState() as RootState;
    const token = state.auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (import.meta.env.SSR) {
      // Пример: берем куки из extraOptions (если передали)
      const cookie = state.auth.refreshCookie;

      if (cookie) {
        headers.set("Cookie", cookie);
      }
    }

    return headers;
  },
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

// Наша обёртка
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1) Выполняем запрос
  let result = await rawBaseQuery(args, api, extraOptions);

  // 2) Если 401 — пытаемся рефрешнуть
  if (result.error && result.error.status === 401) {
    const { dispatch, getState } = api;
    const state = getState() as RootState;

    if (!state.auth.isRefreshing) {
      // Если рефреш ещё не запущен, запускаем
      const refreshP = (async () => {
        const refreshResp = await rawBaseQuery(
          { url: "/refresh", method: "POST" },
          api,
          extraOptions,
        );
        if (refreshResp.data) {
          // сервер вернул новый accessToken
          const newToken = (refreshResp.data as { accessToken: string })
            .accessToken;
          dispatch(setAccessToken(newToken));
          if (import.meta.env.SSR) {
            dispatch(
              setReturnCookie(
                refreshResp.meta?.response?.headers.getSetCookie()[0] ?? null,
              ),
            );
          }
          return newToken;
        } else {
          dispatch(logout());
          throw new Error("Refresh failed");
        }
      })();

      // Записываем промис в store
      dispatch(startRefresh(refreshP));

      try {
        // Ждём, пока рефреш завершится
        await refreshP;
      } catch {
        // Если упало — возвращаем 401
        return { error: { status: 401, data: "Refresh failed" } } as {
          error: FetchBaseQueryError;
        };
      } finally {
        // в любом случае снимаем флаг
        dispatch(finishRefresh());
      }

      // Успешно рефрешнулись, пробуем запрос заново
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Уже идёт рефреш, ждём существующий promise
      const existingPromise = state.auth.refreshPromise;
      if (existingPromise) {
        try {
          await existingPromise;
        } catch {
          return { error: { status: 401, data: "Refresh failed" } } as {
            error: FetchBaseQueryError;
          };
        } finally {
          dispatch(finishRefresh());
        }
        // Повторяем запрос
        result = await rawBaseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};
