import { Box, Button, Modal as ModalMUI, Typography } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetBasket,
  selectModal,
} from "../ShoppingBasket/ShoppingBasketSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const Modal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);
  const handleClose = () => {
    dispatch(resetBasket());
    navigate("/test/?page=1");
  };
  return (
    <>
      <ModalMUI
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ваш заказ успешно оформлен!
          </Typography>
          <Button onClick={handleClose}>
            <DoneOutlineIcon />
          </Button>
        </Box>
      </ModalMUI>
    </>
  );
};
