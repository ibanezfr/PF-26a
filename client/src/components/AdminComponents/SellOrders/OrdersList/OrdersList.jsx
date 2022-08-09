import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";
import OrdersActions from "./OrdersActions";
import { useTranslation } from 'react-i18next';

const OrdersList = ({ orders }) => {
  const { t } = useTranslation();
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

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: t('ordersList.avatarHeader'),
        width: 60,
        renderCell: (params) => <Avatar src={params?.row?.user?.image} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "email",
        headerName: t('ordersList.emailHeader'),
        width: 150,
        renderCell: (params) => params.row.user.email,
      },
      {
        field: "userId",
        headerName: t('ordersList.userHeader'),
        width: 100,
      },
      {
        field: "product",
        headerName: t('ordersList.productsHeader'),
        type: "string",
        renderCell: (params) =>
          params.row.products
            .map((e) => e.name)
            .join(", ")
            .trim(),
        width: 350,
      },
      {
        field: "amount",
        headerName: t('ordersList.amountHeader'),
        type: "number",
        width: 100,
      },

      {
        field: "date",
        headerName: t('ordersList.dateHeader'),
        width: 170,
        type: "date",
      },

      { field: "id", headerName: t('ordersList.idHeader'), width: 75 },
      {
        field: "orderStatus",
        headerName: t('ordersList.statusHeader'),
        width: 100,
        type: "singleSelect",
        valueOptions: ["pending", "accepted", "rejected"],
        editable: true,
      },
      {
        field: "actions",
        headerName: t('ordersList.actionsHeader'),
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
