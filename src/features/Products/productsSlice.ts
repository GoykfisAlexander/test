import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import products from "../../assets/products.json";
import brands from "../../assets/brands.json";

interface IProducts {
  products: {
    type: string;
    id: number;
    sku: string;
    title: string;
    regular_price: {
      currency: string;
      value: number;
    };
    image: string;
    brand: number;
  }[];
  brands: {
    id: number;
    title: string;
    sort: string;
    code: string;
  }[];
  pageQty: number;
  page: number;
}

const initialState: IProducts = {
  products,
  brands,
  pageQty: Math.ceil(products.length / 6),
  page: 1,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    productsFilter: (state, action) => {
      if (Object.values(action.payload).every((e) => !e)) {
        state.products = products;
        state.pageQty = Math.ceil(products.length / 6);
        return;
      }
      state.products = products.filter(
        (product) => action.payload[product.brand]
      );
      state.pageQty = Math.ceil(state.products.length / 6);
      if (state.page > state.pageQty) {
        state.page = state.pageQty;
      }
    },
  },
});

export const { setPage, productsFilter } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export const selectBrands = (state: RootState) => state.products.brands;
export const selectPageQty = (state: RootState) => state.products.pageQty;
export const selectPage = (state: RootState) => state.products.page;

export default productsSlice.reducer;
