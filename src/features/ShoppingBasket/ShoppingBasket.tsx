import { Card, Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectProducts } from "./ShoppingBasketSlice";
import { Product } from "../Product/Product";
import { Checkout } from "../Checkout/Checkout";
import { Modal } from "../Modal/Modal";

export const ShoppingBasket = () => {
  const products = useAppSelector(selectProducts);
  return (
    <>
      <Modal />
      {Object.keys(products).length ? (
        <Container sx={{ display: "flex" }}>
          <Grid
            container
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Checkout />
            {Object.values(products).map((product) => (
              <Grid item xs={7} md={7} key={product.id}>
                <Product product={product} inStore={false} />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Card>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Корзина пуста
          </Typography>
        </Card>
      )}
    </>
  );
};
