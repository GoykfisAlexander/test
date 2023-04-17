import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectNumberOfProducts,
  selectProducts,
  setModal,
} from "../ShoppingBasket/ShoppingBasketSlice";
import { useState } from "react";
import axios from "axios";
interface Errors {
  name?: string;
  phone?: string;
}
export const Checkout = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const numberOfProducts = useAppSelector(selectNumberOfProducts);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const submitData = async () => {
    try {
      const response = await axios.post(
        "https://app.aaccent.su/js/confirm.php",
        products
      );
      if (response.data.result === "ok") {
        dispatch(setModal());
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setModal());
    }
  };
  const totalCost = () => {
    let total = 0;
    for (const key in numberOfProducts) {
      if (!products[key]?.regular_price.value) {
        continue;
      }
      total += products[key].regular_price.value * 100 * numberOfProducts[key];
    }
    return total / 100;
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const validate = (): Errors => {
    let errors: Errors = {};

    if (!name) {
      errors.name = "Введите имя";
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
      errors.name = "Имя может содержать только буквы и пробелы";
    }
    const phoneRegex =
      /^(\+7|8)?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
    if (!phone) {
      errors.phone = "Введите телефон";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Неверный формат телефона";
    }
    return errors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setName("");
      setPhone("");
      setErrors({});
      submitData();
    }
  };
  return (
    <Paper
      sx={{
        mt: 10,
        p: 10,
        height: "max-content",
        "@media (orientation: landscape)": {
          position: "fixed",
          right: 0,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Итого: {totalCost()} USD.
      </Typography>
      <Box
        component="form"
        sx={{ display: "grid" }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Имя"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Телефон"
          variant="outlined"
          value={phone}
          onChange={handlePhoneChange}
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <Button variant="contained" type="submit">
          Оформить заказ
        </Button>
      </Box>
    </Paper>
  );
};
