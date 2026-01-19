import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { postApi } from '../features/posts/postApi';
import favoritesReducer from '../features/favorites/FavoritesSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [postApi.reducerPath]: postApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 128,
      },
    }).concat(api.middleware, postApi.middleware),
});
