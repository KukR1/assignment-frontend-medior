import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import cartSlice from './cartSlice';
import productSlice from './productSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    recentlyViewedProducts: productSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
