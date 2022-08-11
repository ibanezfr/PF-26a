import { Paper, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import Lista from "../List/List";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import CategoryList from "./Category/CategoryList";
import CreateCategory from "./Category/CreateCategory";
import "./ProductsAdmin.scss";
// import { useEffect } from "react";
const ProductsAdmin = () => {
  const { t } = useTranslation();
  const [render, setRender] = useState(true);
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
          <CreateCategory setRender={setRender} render={render}/>

          <Paper elevation={3} sx={{ p: 3, gridColumn: "1/3", width: 1 }}>
            <Typography variant="h6">{t("productsAdmin")}</Typography>
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            > */}
            <CategoryList render={render}/>
            {/* </Box> */}
          </Paper>

          <Paper elevation={3} sx={{ p: 2, gridColumn: "1/4" }}>
            <Lista />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default ProductsAdmin;
