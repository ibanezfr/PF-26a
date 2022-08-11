import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUsers } from "../../../redux/actions";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import { Group, Checkroom } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
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
import Lista from "../List/List";

const HomeAdmin = () => {
  const { t } = useTranslation();
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
            <Typography variant="h4">{t("homeAdmin.totalUsers")}</Typography>
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
            <Typography variant="h4">{t("homeAdmin.totalProducts")}</Typography>
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
              <Typography>{t("homeAdmin.recentAdded")}</Typography>
              <List>
                {users.slice(0, 4).map((user, i) => (
                  <Box key={user.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={user?.name} src={user?.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user?.name}
                        secondary={`${t("homeAdmin.created")} ${moment(
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
              <Typography>{t("homeAdmin.recentProducts")}</Typography>
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
                        secondary={`${t("homeAdmin.added")} ${moment(
                          prod?.createdAt
                        ).format("YYYY-MM-DD H:mm:ss")}`}
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
          <Paper elevation={3} sx={{ p: 2, gridColumn: "1/4" }}>
            <UserList />
          </Paper>
          {/* <Paper elevation={3} sx={{ p: 2, gridColumn: "1/4" }}>
            <Lista />
          </Paper> */}
        </Box>
      </div>
    </div>
  );
};

export default HomeAdmin;
