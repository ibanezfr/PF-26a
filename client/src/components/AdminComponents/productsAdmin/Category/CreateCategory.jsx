import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Paper, Grid, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../../api_url/api_url";
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";

const CreateCategory = ({setRender, render}) => {
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
      // setCategories({ name: "" });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Categoria creada",
        showConfirmButton: false,
        timer: 1500
      });
      // setCategories({ name: "" });
      setRender(!render)
      // alert("Categoria creada con Exito!");
    } catch (error) {
      // console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Ya existe una categoria con ese nombre",
        showConfirmButton: false,
        timer: 1500
      });
    }
    e.target.reset()
    // setCategories({ name: "" });
  };
  const handleChange = (e) => {
    setCategories({ ...categories, [e.target.name]: e.target.value });
    // if (categories.length) {
    //   return setErrors("Nombre demasiado corto");
    // }
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
