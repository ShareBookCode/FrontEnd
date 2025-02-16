import { createSlice } from "@reduxjs/toolkit";
import { GenreDto, sharebookApi } from "./services/api/sharebookApi.ts";

interface MainState {
  genreMap: Record<string, GenreDto>;
}

const initialState: MainState = {
  genreMap: {},
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      sharebookApi.endpoints.findAllGenre.matchFulfilled,
      (state, { payload }) => {
        const genreMap: Record<string, GenreDto> = {};

        payload.forEach((item) => {
          if (item.id !== undefined && item.name !== undefined) {
            genreMap[item.id] = item;
          }
        });

        state.genreMap = genreMap;
      },
    );
  },
});

// export const {} = mainSlice.actions;

export const mainReducer = mainSlice.reducer;
