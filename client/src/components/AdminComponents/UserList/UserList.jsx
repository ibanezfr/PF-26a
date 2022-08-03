// import "./UserList.scss";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
// import { useValue } from "../../../context/ContextProvider";
// import { getUsers } from "../../../actions/user";
// import moment from "moment";
// import { grey } from "@mui/material/colors";
import UserActions from "./UserActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/actions";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
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
  }, []);

  useEffect(() => {
    return !users.length ? dispatch(fetchUsers()) : null;
  }, [dispatch, users]);

  console.log(users);
  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.image} />,
        sortable: false,
        filterable: false,
      },
      { field: "fullName", headerName: "Name", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "admin",
        headerName: "Role",
        width: 100,
        type: "singleSelect",
        valueOptions: ["User", "Admin"],
        editable: true,
      },
      {
        field: "banned",
        headerName: "Status",
        width: 100,
        type: "singleSelect",
        valueOptions: ["Banned", "Active"],
        editable: true,
      },

      { field: "id", headerName: "Id", width: 220 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <UserActions {...{ params, rowId, setRowId }} />
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
        Manage Users
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
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
