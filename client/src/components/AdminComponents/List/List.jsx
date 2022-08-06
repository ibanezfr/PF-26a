import "./List.scss";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import { Link, useHistory } from "react-router-dom";
import ListActions from "./ListActions";

const Lista = () => {
  // const dispatch = useDispatch();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 60,
        renderCell: (params) => (
          <Link to={`/products/${params.row.id}`}>
            <Avatar src={params.row.image} />
          </Link>
        ),
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 200, editable: true },
      { field: "color", headerName: "Color", width: 150, editable: true },
      {
        field: "categories",
        headerName: "Category",
        width: 250,
        renderCell: (params) =>
          params.row.categories
            .map((e) => e.name)
            .join(", ")
            .trim(),
      },
      {
        field: "size",
        headerName: "Size",
        width: 120,
        type: "string",
        renderCell: (params) =>
          params.row.product_values
            .map((e) => e.size)
            .join(", ")
            .trim(),
        // editable: true,
      },
      {
        field: "stock",
        headerName: "Stock",
        width: 120,
        type: "string",
        renderCell: (params) =>
          params.row.product_values
            .map((e) => e.stock)
            .join(", ")
            .trim(),
        // editable: false,
      },
      {
        field: "rating",
        headerName: "Ratings",
        width: 60,
        type: "integer",
        editable: false,
      },
      {
        field: "status",
        headerName: "Status",
        width: 60,
        type: "singleSelect",
        valueOptions: ["active", "inactive"],
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
    <Box sx={{ height: 800, width: "100%" }}>
      <Typography variant="h5">Administrar productos</Typography>
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
            bgcolor: grey[200],
          },
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default Lista;
