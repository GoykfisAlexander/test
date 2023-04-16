import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IProducts {
  products: {
    [key: string]: {
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
    };
  };
  shoppingBasket: boolean;
  numberOfProducts: {
    [key: string]: number;
  };
  modal: boolean;
}

const initialState: IProducts = {
  products: {},
  shoppingBasket: false,
  numberOfProducts: {},
  modal: false,
};

export const shoppingBasketSlice = createSlice({
  name: "shoppingBasket",
  initialState,
  reducers: {
    pushProduct(state, actions) {
      state.products[actions.payload.id] = actions.payload;
      state.numberOfProducts[actions.payload.id] = 1;
    },
    setShoppingBasket(state) {
      state.shoppingBasket = !state.shoppingBasket;
    },
    incrementNumberOfProducts(state, actions) {
      state.numberOfProducts[actions.payload]++;
    },
    decrementNumberOfProducts(state, actions) {
      if (state.numberOfProducts[actions.payload] === 1) {
        delete state.numberOfProducts[actions.payload];
        delete state.products[actions.payload];
      }
      state.numberOfProducts[actions.payload]--;
    },
    setModal(state) {
      state.modal = true;
    },
    resetBasket(state) {
      state.products = {};
      state.shoppingBasket = false;
      state.numberOfProducts = {};
      state.modal = false;
    },
  },
});

export const {
  pushProduct,
  setShoppingBasket,
  incrementNumberOfProducts,
  decrementNumberOfProducts,
  setModal,
  resetBasket,
} = shoppingBasketSlice.actions;
export const selectProducts = (state: RootState) =>
  state.shoppingBasket.products;
export const selectShoppingBasket = (state: RootState) =>
  state.shoppingBasket.shoppingBasket;
export const selectNumberOfProducts = (state: RootState) =>
  state.shoppingBasket.numberOfProducts;
export const selectModal = (state: RootState) => state.shoppingBasket.modal;

export default shoppingBasketSlice.reducer;
