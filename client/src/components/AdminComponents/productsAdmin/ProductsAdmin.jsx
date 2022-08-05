import { Paper, Box } from "@mui/material";

import React from "react";
import Lista from "../List/List";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import CreateCategory from "./Category/CreateCategory";
import "./ProductsAdmin.scss";
const ProductsAdmin = () => {
  return (
    <div className="products">
      <SidebarAdmin />
      <div className="productsContainer">
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: "repeat(3,1fr)",
            gridAutoRows: "minmax(100px, auto)",
            gap: 3,
            textAlign: "center",
            flexDirection: "column",
            marginLeft: 2,
            marginTop: 2,
          }}
        >
          <CreateCategory />

          <Paper elevation={3} sx={{ p: 2, gridColumn: "1/4" }}>
            <Lista />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default ProductsAdmin;
