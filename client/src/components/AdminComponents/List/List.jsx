import "./List.scss";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography, Button } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import ListActions from "./ListActions";
import { useHistory } from "react-router-dom";

const List = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const history = useHistory();
  const [rowId, setRowId] = useState(null);
  let products = useSelector((state) => state.products);

  const handleKick = async () => {
    const check = await JSON.parse(localStorage.getItem("isAdmin"));
    if (!check) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleKick();
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.image} />,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 200 },
      { field: "color", headerName: "Color", width: 150 },
      {
        field: "categories",
        headerName: "Category",
        width: 200,
        type: "singleSelect",
        valueOptions: [
          "Accesorios",
          "Bufandas",
          "Buzos",
          "Calzas",
          "Camperas",
          "Chalecos",
          "Conjuntos",
          "Equipamento deportivo",
          "Gorra",
          "Gorros",
          "Indumentaria de hombre",
          "Indumentaria de mujer",
          "Indumentaria sin género",
          "Medias",
          "Pantalones",
          "Remeras",
          "Tops deportivos",
        ],
        editable: true,
      },
      {
        field: "rating",
        headerName: "Ratings",
        width: 60,
        type: "integer",
        editable: false,
      },
      {
        field: "stock",
        headerName: "Stock",
        width: 60,
        type: "integer",
        editable: true,
      },

      { field: "id", headerName: "Id", width: 220 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <ListActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box sx={{ height: 775, width: "100%" }}>
      <Button onClick={(e) => history.push("/admin/home")}>
        Voler al Dashboard
      </Button>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Administrar productos
      </Typography>
      <DataGrid
        columns={columns}
        rows={products}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[10, 20, 30]}
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
};

export default List;
