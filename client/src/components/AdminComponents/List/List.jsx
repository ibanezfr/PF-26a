import "./List.scss";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import { Link, useHistory } from "react-router-dom";
import ListActions from "./ListActions";
import { fetchProducts } from "../../../redux/actions";

const Lista = () => {
  // const dispatch = useDispatch();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const history = useHistory();
  const [rowId, setRowId] = useState(null);
  let products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleKick = async () => {
    const check = await JSON.parse(localStorage.getItem("isAdmin"));
    if (!check) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleKick();
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: t("list.headerName1"),
        width: 60,
        renderCell: (params) => (
          <Link to={`/products/${params.row.id}`}>
            <Avatar src={params.row.image} />
          </Link>
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: t("list.headerName2"),
        width: 200,
        editable: true,
      },
      {
        field: "color",
        headerName: t("list.headerName3"),
        width: 100,
        editable: true,
      },
      {
        field: "categories",
        headerName: t("list.headerName4"),
        width: 175,
        renderCell: (params) =>
          params.row.categories
            .map((e) => e.name)
            .join(", ")
            .trim(),
      },
      {
        field: "size",
        headerName: t("list.headerName5"),
        width: 100,
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
        headerName: t("list.headerName6"),
        width: 100,
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
        headerName: t("list.headerName7"),
        width: 60,
        type: "integer",
        editable: false,
      },
      {
        field: "status",
        headerName: t("list.headerName8"),
        width: 60,
        type: "singleSelect",
        valueOptions: ["active", "inactive"],
        editable: true,
      },

      { field: "id", headerName: t("list.headerName10"), width: 220 },
      {
        field: "actions",
        headerName: t("list.headerName9"),
        type: "actions",
        renderCell: (params) => (
          <ListActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowId]
  );

  return (
    <Box sx={{ height: 800, width: 1 }}>
      <Typography variant="h5">{t("list.h5Title")}</Typography>
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
