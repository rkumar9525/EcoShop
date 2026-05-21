import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product } from '../../types';

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  itemCount: 0,
};

const recalculateTotals = (state: CartState) => {
  state.itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  state.totalAmount = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }

      recalculateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        item => item.product.id !== action.payload,
      );
      recalculateTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(i => i.product.id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.product.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }

      recalculateTotals(state);
    },

    clearCart: state => {
      state.items = [];
      state.totalAmount = 0;
      state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;