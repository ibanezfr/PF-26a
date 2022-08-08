import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import OrdersActions from "./OrdersActions";

const OrdersList = ({ orders }) => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const history = useHistory();

  const handleKick = async () => {
    const check = await JSON.parse(localStorage.getItem("isAdmin"));
    if (!check) {
      history.push("/login");
    }
  };

  useEffect(() => {
    handleKick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(orders);
  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.user.image} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "email",
        headerName: "Email",
        width: 150,
        renderCell: (params) => params.row.user.email,
      },
      {
        field: "userId",
        headerName: "User ID",
        width: 100,
      },
      {
        field: "product",
        headerName: "Products",
        type: "string",
        width: 250,
      },
      {
        field: "amount",
        headerName: "Amount $",
        type: "number",
        width: 100,
      },

      {
        field: "date",
        headerName: "Date",
        width: 170,
        type: "date",
      },

      { field: "id", headerName: "Id", width: 75 },
      {
        field: "orderStatus",
        headerName: "Status",
        width: 100,
        type: "singleSelect",
        valueOptions: ["pending", "accepted", "rejected"],
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <OrdersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        All Orders
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
            bgcolor: grey[200],
          },
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default OrdersList;
