import React, { useEffect, useState } from "react";
import {fetchCategories} from "../../redux/actions/index.js"
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";



export default function NewCategory() {
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
        placeholder="nombre"
        value={categories.name}
        onChange={handleChange}
        required
        />
        <input 
        type="submit"
        name="create"
        className="" />
      </div>
     </form>
    </div>
  );
}