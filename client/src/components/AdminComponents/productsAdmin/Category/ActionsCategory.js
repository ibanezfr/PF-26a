import React, { useState } from "react";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "../../../../api_url/api_url";
import Swal from "sweetalert2";

export const ActionsUpdate = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const { name, id } = params.row;
    try {
      const result = await axios.put(`${BASE_URL}/categories/${id}`, {
        name,
      });
      if (result) {
        setSuccess(true);
        setRowId(null);
      }
      setLoading(false);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Categoria editada con exito",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      console.log(err);
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

export const ActionsDelete = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    const { id } = params.row;
    const result = await axios.delete(`${BASE_URL}/categories/${id}`);
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  }

  const handleSubmit = async () => {
    setLoading(true);

    try {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Esta accion no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete();
          Swal.fire(
            'Eliminado',
            'La categoria se elimino',
            'success'
          )
        }
      })
      setLoading(false);
      // const result = await axios.delete(`${BASE_URL}/categories/${id}`);
      // if (result) {
      //   setSuccess(true);
      //   setRowId(null);
      // }
      // setLoading(false);
      // alert("Categoria eliminada con exito");
    } catch (err) {
      console.log(err);
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
          <DeleteIcon />
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
