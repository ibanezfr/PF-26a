import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchCategory} from "../../redux/actions/index.js"
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";

export default function EditCategories(){
    const dispatch = useDispatch();
    let { id } = useParams();
    const [categories, setCategories] = useState({
      name: "",
    });
    useEffect(() => {
        fetchCategory(dispatch);
      }, []);

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
      
        setCategories({ ...categories, [e.target.name]: e.target.value });
      };
      const handleDelete = async () => {
        try {
          await axios.delete(`/categories/${id}`);
        
        } catch (err) {
          console.log(err);
        }
      };
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <div className="">
            <input
          type="text"
          name="name"
          placeholder={categories.name}
          value={categories.name}
            onChange={handleChange}
          required
        />
          <input
            type="submit"
            name="edit"           
            className=""
          />
        </div>
            </form>
            <button className="button" onClick={handleDelete}>
                            X
        </button>
          
        </div>
    )
}