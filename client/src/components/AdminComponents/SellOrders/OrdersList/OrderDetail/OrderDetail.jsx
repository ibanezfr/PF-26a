// import { Box, Paper, Typography } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const OrderDetail = () => {
//   const { id } = useParams();
//   const [data, setData] = useState();

//   const getOrder = async () => {
//     try {
//       const orders = await axios.get(
//         `http://localhost:3001/auth/compras/${id}`
//       );
//       setData(orders.data);
//       console.log(orders.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getOrder();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <Paper>
//       <Typography>ALO</Typography>
//       <Typography>{data.products.name}</Typography>
//       <Typography>{data.amount}</Typography>
//       <Typography>{data.orderStatus}</Typography>
//     </Paper>
//   );
// };

// export default OrderDetail;
