import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "../features/Products/productsSlice";
import shoppingBasketReducer from "../features/ShoppingBasket/ShoppingBasketSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    shoppingBasket: shoppingBasketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
