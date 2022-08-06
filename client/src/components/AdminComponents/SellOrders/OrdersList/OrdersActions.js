import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import axios from "axios";

const OrdersActions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { orderStatus, id } = params.row;

      const result = await axios.put(
        `http://localhost:3001/auth/compras/${id}`,
        {
          orderStatus,
        }
      );
      if (result) {
        setSuccess(true);
        setRowId(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowId]);
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default OrdersActions;
