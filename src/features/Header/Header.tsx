import { AppBar, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectShoppingBasket } from "../ShoppingBasket/ShoppingBasketSlice";
import { Basket } from "../Basket/Basket";

export const Header = () => {
  const basket = useAppSelector(selectShoppingBasket);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5">
          {basket ? "Shopping Basket" : "Shop"}
        </Typography>
        <Basket />
      </Toolbar>
    </AppBar>
  );
};
