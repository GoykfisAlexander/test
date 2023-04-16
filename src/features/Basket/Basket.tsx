import { ShoppingBasket } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  setShoppingBasket,
  selectProducts,
  selectShoppingBasket,
} from "../ShoppingBasket/ShoppingBasketSlice";
import StoreIcon from "@mui/icons-material/Store";
export const Basket = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector(selectProducts);
  const basket = useAppSelector(selectShoppingBasket);
  const handleClick = () => {
    dispatch(setShoppingBasket());
    navigate(basket ? "/?page=1" : "/ShoppingBasket/");
  };
  return (
    <Badge
      badgeContent={basket || Object.keys(products).length}
      color="primary"
    >
      <IconButton onClick={handleClick} color="inherit">
        {basket ? <StoreIcon /> : <ShoppingBasket />}
      </IconButton>
    </Badge>
  );
};
