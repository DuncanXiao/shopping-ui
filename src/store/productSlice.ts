import * as services from "@/services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from ".";
import {HYDRATE} from 'next-redux-wrapper';
// Initial state
const initialState = {
  products: {
    data: [],
    total: 100,
    page: 1,
    pageSize: 10
  },
};


export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (payload: any, thunkAPI) => {
    const response = await services.getProducts(payload)
    thunkAPI.dispatch(ProductSlice.actions.setProduct(response))
  }
)

// Actual Slice
const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Action to set the authentication status
    setProduct: (state, action) => {
      state.products = action.payload;
    }
  },
  extraReducers:(builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state: any, action: any) => {
      return {
        ...state,
        ...action.payload.product,
      }
    })
  },
});
export const selectProducts = (state: AppState) => state.product.products;

export default ProductSlice;