import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import { fetchCategory } from "../../../../redux/actions";
import { ActionsUpdate, ActionsDelete } from "./ActionsCategory";
import { useTranslation } from "react-i18next";

const CategoryList = ({ render }) => {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(4);
  const [rowId, setRowId] = useState(null);
  const allCategories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  console.log("hola", allCategories);
  useEffect(() => {
    dispatch(fetchCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, rowId]);

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: t("categoryList.headerName1"),
        width: 200,
        renderCell: (params) => params.row.name,

        editable: true,
      },

      { field: "id", headerName: t("categoryList.headerName3"), width: 300 },
      {
        field: "actionUpdate",
        headerName: t("categoryList.headerName2"),
        type: "actions",
        renderCell: (params) => (
          <ActionsUpdate {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: "select",
        headerName: t("categoryList.headerName4"),
        type: "boolean",

        editable: true,
      },
      {
        field: "actionDelete",
        headerName: t("categoryList.headerName5"),
        type: "actions",
        renderCell: (params) => (
          <ActionsDelete {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId, t]
  );

  return (
    <Box sx={{ height: 400, width: 1, paddingTop: "2rem" }}>
      <Typography variant="h6">{t("productsAdmin")}</Typography>
      <DataGrid
        columns={columns}
        rows={allCategories}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[3, 6, 12]}
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

export default CategoryList;
