import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {HYDRATE} from 'next-redux-wrapper';
import * as services from "@/services";
// Initial state
const initialState = {
  navigator: [],
};
export type CategoriesType = {
  id: number;
  name: string;
};

// Actual Slice
const navigateSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {
    // Action to set the authentication status
    setNavigate: (state, action) => {
      state.navigator = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
        return {
            ...state,
            ...action.payload.navigate,
        };
    },
  },
});

// export const getCategory = createAsyncThunk(
//   'navigate/getCategory',
//   async (userId: number, thunkAPI) => {
//     console.log('userId: ', userId, 'thunkAPI: ', thunkAPI)
//     const response = await services.getCategory()
//     console.log('------', response)
//     return response.data
//   }
// )

export default navigateSlice;