import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Fruit } from 'types/Fruit';
import { Vegetable } from 'types/Vegetable';
import { RootState } from './store';

interface CartItem {
  product: Fruit | Vegetable;
  count: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Fruit | Vegetable>) => {
      let item = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        item.count += 1;
      } else {
        state.items.push({ product: action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      let item = state.items.find((item) => item.product.id === action.payload);
      if (item) {
        item.count -= 1;
        if (item.count <= 0) {
          state.items = state.items.filter(
            (i) => i.product.id !== action.payload
          );
        }
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
  },
});

export const selectCartItem = (state: RootState, productId: string) =>
  state.cart.items.find((item) => item.product.id === productId);

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
