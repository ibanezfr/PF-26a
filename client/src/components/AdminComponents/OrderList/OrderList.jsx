// import "./UserList.scss";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
// import { useValue } from "../../../context/ContextProvider";
// import { getUsers } from "../../../actions/user";
// import moment from "moment";
// import { grey } from "@mui/material/colors";
import OrderActions from "./OrderActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchUsers } from "../../../redux/actions";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import axios from "axios";


const URL_FOR_FETCH_ORDER_LIST = 'http://localhost:3001/auth/compras/all'


export default async function OrderList() {
  const dispatch = useDispatch();
  //const order = useSelector((state) => state.orders);

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const history = useHistory();
  
  let order = await axios.get(URL_FOR_FETCH_ORDER_LIST)
  let orders = order.data;
/*   const handleShipping = async () => {
    const check = await JSON.parse(localStorage.getItem("shippingStatus"));
    if (!check) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleShipping();
  }, []); */
/* 
  useEffect(() => {
    return !orders.length ? dispatch(fetchOrders()) : null;
  }, [dispatch, orders]); */

  console.log(orders);
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "Order Number",
        width: 60,
        sortable: false,
        filterable: false,
      },
      { field: "product", headerName: "Description", width: 170 },
      { field: "amount", headerName: "Amount", width: 200 },
      {
        field: "shippingInfo",
        headerName: "Shipping Info",
        width: 100,
      },
      {
        field: "orderStatus",
        headerName: "Order Status",
        width: 100,
        type: "singleSelect",
        valueOptions: ["Pending", "Accepted", "Rejected"],
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <OrderActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage Orders
      </Typography>
      <DataGrid
        columns={columns}
        rows={orders}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
}
