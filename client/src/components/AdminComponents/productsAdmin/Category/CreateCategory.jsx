import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Paper, Grid, TextField, Typography, Button } from "@mui/material";

const CreateCategory = () => {
  const history = useHistory();
  const [errors, setErrors] = useState();
  const [data, setData] = useState({
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper>
        <Grid item xs={true}>
          <Typography variant="h6">Crear Categoria:</Typography>
          <TextField
            type="text"
            placeholder="Nombre de la categoria"
            label="Name"
            variant="outlined"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="info" fullWidth>
            Crear
          </Button>
        </Grid>
      </Paper>
    </form>
  );
};

export default CreateCategory;
