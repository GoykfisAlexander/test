import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { productsFilter, selectBrands } from "../Products/productsSlice";
import { useState } from "react";

type BooleanObject = {
  [key: string]: boolean;
};
export const Filter = () => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector(selectBrands);
  const unFilteredBrands = brands.reduce((obj: BooleanObject, key) => {
    obj[key.id] = false;
    return obj;
  }, {});
  const [brandsFilter, setBrandsFilter] = useState({ ...unFilteredBrands });
  const handleChange = (key: number) => {
    brandsFilter[key] = !brandsFilter[key];
    setBrandsFilter({ ...brandsFilter });
  };
  const filter = () => {
    dispatch(productsFilter(brandsFilter));
  };
  const reset = () => {
    setBrandsFilter({ ...unFilteredBrands });
    dispatch(productsFilter(unFilteredBrands));
  };
  return (
    <FormGroup sx={{ width: "max-content", gridArea: "s" }}>
      <h3>Бренды</h3>
      {brands.map((brand) => (
        <FormControlLabel
          key={brand.id}
          control={<Checkbox />}
          checked={brandsFilter[brand.id]}
          onChange={() => handleChange(brand.id)}
          label={brand.title}
        />
      ))}
      <Button variant="contained" onClick={filter}>
        Применить
      </Button>
      <Button variant="text" onClick={reset}>
        × сбросить
      </Button>
    </FormGroup>
  );
};
