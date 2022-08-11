import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../../redux/actions/index.js"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import './Categories.scss'

export default function EditCategories() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [categories, setCategories] = useState({
    name: "",
  });
  useEffect(() => {
    fetchCategory(dispatch);
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
      await axios.put(`/categories/${id}`, {
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

  const handleDelete = async () => {
    try {
      await axios.delete(`/categories/${id}`);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="changeCatCont">
      <h3>Modificá la categoría</h3>
      <form onSubmit={handleSubmit}>
        <div className="formCatCont">
          <button className="buttonInput deleteBtn" onClick={handleDelete}>
            Eliminar
          </button>
          <span>Ingresá el nuevo nombre de la categoría:</span>
          <input
            type="text"
            name="name"
            placeholder={categories.name}
            value={categories.name}
            onChange={handleChange}
            required
          />
          {
            formError.name ? (<h4 className="error"><small>{formError.name}</small></h4>) : false
          }
          <input
            type="submit"
            name="edit"
            className="buttonInput"
            disabled={isSubmit}
          />
        </div>
      </form>

    </div>
  )
}
