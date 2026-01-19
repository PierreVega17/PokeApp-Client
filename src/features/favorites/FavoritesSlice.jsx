import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.list.some(p => p.name === action.payload.name);
      if (!exists) {
        state.list.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.list));
      }
    },
    removeFavorite: (state, action) => {
      state.list = state.list.filter(p => p.name !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.list));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
