import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Product } from '../../types';
import { productService } from '../../api/productService';

const initialState: ProductsState = {
  products: [],
  featuredProducts: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productService.getAllProducts();
      return products;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch products';
      return rejectWithValue(message);
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      if (category === 'all') {
        const products = await productService.getAllProducts();
        return products;
      }
      const products = await productService.getProductsByCategory(category);
      return products;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to filter products';
      return rejectWithValue(message);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.products = action.payload;
          state.featuredProducts = action.payload.slice(0, 5);
          state.error = null;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductsByCategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsByCategory.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.products = action.payload;
          state.error = null;
        },
      )
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;