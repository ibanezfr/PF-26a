import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/actions/index.js"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { useTranslation } from 'react-i18next';


export default function NewCategory() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState({
    name: "",
  });
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

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

    setCategories({ ...categories, [e.target.name]: e.target.value });
  };



  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="">
          <input
            type="text"
            name="name"
            placeholder={t('newCategory.name')}
            value={categories.name}
            onChange={handleChange}
            required
          />
          <input
            type="submit"
            name="create"
            value={t('newCategory.submit')}
            className="" />
        </div>
      </form>
    </div>
  );
}
