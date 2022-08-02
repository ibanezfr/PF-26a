import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUsers } from "../../../redux/actions";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import { Group, Checkroom } from "@mui/icons-material";

import moment from "moment";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import "./HomeAdmin.scss";
import Graphics from "../Graphics/Graphics";
import UserList from "../UserList/UserList";

const HomeAdmin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.user);

  useEffect(() => {
    return !users.length ? dispatch(fetchUsers()) : null;
  }, [dispatch, users]);

  const handleKick = async () => {
    const check = await JSON.parse(localStorage.getItem("isAdmin"));
    if (!check) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleKick();
  }, []);

  return (
    <div className="home">
      <SidebarAdmin />
      <div className="homeContainer">
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: "repeat(3,1fr)",
            gridAutoRows: "minmax(100px, auto)",
            gap: 3,
            textAlign: "center",
            flexDirection: "column",
            marginLeft: 2,
          }}
        >
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Users</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
              <Typography variant="h4">{users.length}</Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Products</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkroom
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h4">{products.length}</Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
            <Box>
              <Typography>Recently added Users</Typography>
              <List>
                {users.slice(0, 4).map((user, i) => (
                  <Box key={user.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={user?.name} src={user?.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user?.name}
                        secondary={`Time Created: ${moment(
                          user?.createdAt
                        ).format("YYYY-MM-DD H:mm:ss")}`}
                      />
                    </ListItem>
                    {i !== 3 && <Divider variant="inset" />}
                  </Box>
                ))}
              </List>
            </Box>
            <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
            <Box>
              <Typography>Recently added Products</Typography>
              <List>
                {products.slice(0, 4).map((prod, i) => (
                  <Box key={prod.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt={prod?.name}
                          src={prod?.image}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={prod?.name}
                        secondary={`Added: ${moment(
                          prod?.createdAt
                        ).fromNow()}`}
                      />
                    </ListItem>
                    {i !== 3 && <Divider variant="inset" />}
                  </Box>
                ))}
              </List>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
            <Graphics products={products} />
          </Paper>
          <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
            <UserList />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default HomeAdmin;
