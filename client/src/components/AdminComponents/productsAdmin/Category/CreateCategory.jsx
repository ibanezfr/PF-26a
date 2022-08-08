import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Paper, Grid, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../../api_url/api_url";
import { useTranslation } from 'react-i18next';

const CreateCategory = () => {
  // const history = useHistory();
  const [errors, setErrors] = useState();
  const { t } = useTranslation();
  const [categories, setCategories] = useState({
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = categories;

    try {
      await axios.post(`${BASE_URL}/categories`, {
        name,
      });
      setCategories({ name: "" });
      alert("Categoria creada con Exito!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setCategories({ ...categories, [e.target.name]: e.target.value });
    if (categories.length) {
      return setErrors("Nombre demasiado corto");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper>
        <Grid item xs={true}>
          {errors ? (
            <Typography variant="h6">{errors}</Typography>
          ) : (
            <Typography variant="h6">Crear Categoria:</Typography>
          )}
          <TextField
            type="text"
            placeholder={t('createCategory.placeHolder1')}
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="info" fullWidth>
            {t('createCategory.create')}
          </Button>
        </Grid>
      </Paper>
    </form>
  );
};

export default CreateCategory;
