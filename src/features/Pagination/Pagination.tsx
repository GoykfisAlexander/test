import { Pagination as PaginationMui, PaginationItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { selectPage, selectPageQty, setPage } from "../Products/productsSlice";
import { Link as NavLink, useLocation, useNavigate } from "react-router-dom";

export const Pagination = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pageQty = useAppSelector(selectPageQty);
  const page = useAppSelector(selectPage);
  useEffect(() => {
    dispatch(setPage(parseInt(location.search.split("=")[1]) || 1));
  }, [dispatch, location]);
  useEffect(() => {
    location.search ?? navigate(`?page=${page}`);
  }, [page, navigate, location]);
  return (
    <PaginationMui
      sx={{ gridArea: "pagi", width: "max-content", margin: "auto", mt: 3 }}
      count={pageQty}
      page={page}
      onChange={(_, num) => dispatch(setPage(num))}
      renderItem={(item) => (
        <PaginationItem
          component={NavLink}
          to={`?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};
