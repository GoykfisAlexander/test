import { Products } from "./features/Products/Products";
import { Header } from "./features/Header/Header";
import { Filter } from "./features/Filter/Filter";
import { Pagination } from "./features/Pagination/Pagination";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ShoppingBasket } from "./features/ShoppingBasket/ShoppingBasket";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Container
                sx={{
                  display: "grid",
                  mt: 3,
                  gridTemplateColumns: "0.2fr 1fr",
                  gridTemplateAreas: `"s p p" "pagi pagi pagi "`,
                  "@media (orientation: portrait)": {
                    display: "flex",
                    flexDirection: "column",
                  },
                }}
              >
                <Filter />
                <Products />
                <Pagination />
              </Container>
            </>
          }
        />
        <Route path="/:basket/*" element={<ShoppingBasket />} />
      </Routes>
    </div>
  );
}

export default App;
