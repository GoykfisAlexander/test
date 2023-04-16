import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  decrementNumberOfProducts,
  incrementNumberOfProducts,
  pushProduct as productPush,
  selectNumberOfProducts,
} from "../ShoppingBasket/ShoppingBasketSlice";
import { RemoveShoppingCart, ShoppingCart } from "@mui/icons-material";
interface IProps {
  product: {
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
  inStore: boolean;
}
export const Product = ({ product, inStore }: IProps) => {
  const numberOfProducts = useAppSelector(selectNumberOfProducts);
  const dispatch = useAppDispatch();
  const pushProduct = () => {
    dispatch(productPush(product));
  };
  const increment = () => {
    dispatch(incrementNumberOfProducts(product.id));
  };
  const decrement = () => {
    dispatch(decrementNumberOfProducts(product.id));
  };
  return (
    <Card sx={{ height: "max-content" }}>
      <CardMedia
        sx={{
          width: "100%",
          height: "10vh",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
        image={product.image}
        title={product.title}
      ></CardMedia>
      <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="span">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Brend ${product.brand}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`цена ${product.regular_price.value} ${product.regular_price.currency}`}
          </Typography>
        </CardContent>
        <CardActions>
          {inStore ? (
            <Button onClick={pushProduct} size="small">
              Купить
            </Button>
          ) : (
            <>
              <IconButton onClick={decrement}>
                <RemoveShoppingCart />
              </IconButton>
              <IconButton onClick={increment}>
                <Badge
                  badgeContent={numberOfProducts[product.id]}
                  color="primary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};
