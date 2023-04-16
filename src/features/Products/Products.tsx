import { useAppSelector } from "../../app/hooks";
import { Product } from "../Product/Product";
import { selectPage, selectProducts } from "./productsSlice";
import { Grid, Typography } from "@mui/material";
export const Products = () => {
  const products = useAppSelector(selectProducts);
  const page = useAppSelector(selectPage);
  return (
    <>
      {products.length ? (
        <Grid
          container
          sx={{
            gridArea: "p",
          }}
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {products.slice(6 * (page - 1), 6 * page).map((product) => (
            <Grid item xs={12} md={4} key={product.id}>
              <Product product={product} inStore={true} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Товар не найден
        </Typography>
      )}
    </>
  );
};
