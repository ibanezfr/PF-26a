import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/actions/index.js"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { useTranslation } from 'react-i18next';
import './Categories.scss'


export default function NewCategory() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState({
    name: "",
  });
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);


  const [formError, setFormError] = useState(true);

  const [isSubmit, setisSubmit] = useState(true);

  function validString(data) {
    let errors = {}
    if (data.name.length < 1 || data.name.length > 255) errors.name = "El título debe tener más de 1 catácter y menos de 255";
    if (typeof data.name !== "string") errors.name = "La información enviada debe ser de tipo string";

    if ((Object.keys(errors).length) === 0) {
      setisSubmit(false)
    };

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = categories;
    try {
      await axios.post(`/categories/`, {
        name,
      });

    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setFormError(validString(categories));
    if ((Object.keys(formError).length) !== 0) {
      setisSubmit(true)
    };
    setCategories({ ...categories, [e.target.name]: e.target.value });

  };



  return (
    <div className="createCategoryContainer">
      <div className="catTitleCont">
        <h3>Creá una nueva categoría</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="formCatCont">
          <span>Ingresá el nombre:</span>
          <input
            type="text"
            name="name"
            placeholder={t('newCategory.name')}
            value={categories.name}
            onChange={handleChange}
            required
          />
          {
            formError.name ? (<h4 className="error"><small>{formError.name}</small></h4>) : false
          }
          <input
            type="submit"
            name="create"
            value={t('newCategory.submit')}
            className="buttonInput"
            disabled={isSubmit} />
        </div>
      </form>
    </div>
  );
}
