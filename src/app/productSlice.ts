import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Fruit } from 'types/Fruit';
import { Vegetable } from 'types/Vegetable';

interface ProductState {
  products: (Fruit | Vegetable)[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    recentlyViewedProducts: (
      state,
      action: PayloadAction<Fruit | Vegetable>
    ) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      state.products.unshift(action.payload);

      if (state.products.length > 5) {
        state.products.pop();
      }
    },
  },
});

export const { recentlyViewedProducts } = productSlice.actions;

export default productSlice.reducer;
