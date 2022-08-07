import React, { useEffect } from "react";
import { Paper, Box, Typography } from "@mui/material";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import OrdersList from "./OrdersList/OrdersList";
import "../productsAdmin/ProductsAdmin.scss";
import AreaOrdersUsers from "./AreaOrdersUsers";
import { useDispatch, useSelector } from "react-redux";
import { getBuys } from "../../../redux/actions";
import Widget from "../Widget/Widget";
const SellOrders = () => {
  const orders = useSelector((state) => state.buys);
  const dispatch = useDispatch();

  useEffect(() => {
    return !orders.length ? dispatch(getBuys()) : null;
  }, [dispatch, orders]);

  const amount = orders
    .map((e) => Number(e.amount))
    .reduce((prev, curr) => prev + curr, 0);

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
          <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
            <Box>
              <Widget amount={amount} type="earning" />
              <Widget ordersNumber={orders.length} type="order" />
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
            <AreaOrdersUsers orders={orders} />
          </Paper>
          <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
            <OrdersList orders={orders} />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default SellOrders;
