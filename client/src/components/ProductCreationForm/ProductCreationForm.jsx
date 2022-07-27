import "./ProductCreationForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";

export function validate() {

}

export default function ProductCreationForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const categoriesArray = useSelector((state) => state.categories);
    const sizesArray = ["S", "L", "M", "XL", "XXL"]
    console.log(categoriesArray);
    const [input, setInput] = useState({
        name: "",
        price: 0,
        description: "",
        color: "",
        image: "",
        image2: "",
        image3: "",
        image4: "",
        stock: 0,
        status: "",
        size: [],
        categories: [],
    })
    const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {

    }
    const handleSubmit = (e) => {

    }


    return (
        <div className="login">
            <section id="login-window">
                <h1>Product Creation Form</h1>
                <p className="error">
                    {/* { && <span className="Error"></span>} */}
                </p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Your product's name..."
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    ></input>
                    <input
                        className="form-input"
                        type="number"
                        placeholder="Your product's price..."
                        name="price"
                        onChange={(e) => handleInputChange(e)}
                    ></input>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Your product's color..."
                        name="color"
                        onChange={(e) => handleInputChange(e)}
                    ></input>
                    <label >Image 1: </label>
                    <FileBase
                        type="image"
                        multiple={false}
                        onDone={({ base64 }) => setInput({ ...input, image: base64 })}
                    />
                    <label >Image 2: </label>
                    <FileBase
                        type="image"
                        multiple={false}
                        onDone={({ base64 }) => setInput({ ...input, image2: base64 })}
                    />
                    <label >Image 3: </label>
                    <FileBase
                        type="image"
                        multiple={false}
                        onDone={({ base64 }) => setInput({ ...input, image3: base64 })}
                    />
                    <label >Image 4: </label>
                    <FileBase
                        type="image"
                        multiple={false}
                        onDone={({ base64 }) => setInput({ ...input, image4: base64 })}
                    />
                    <input
                        className="form-input"
                        type="number"
                        placeholder="Your product's stock..."
                        name="stock"
                        onChange={(e) => handleInputChange(e)}
                    ></input>
                    <label>Size:</label>
                    <select
                        className="form-input"
                        name="size"
                        onChange={(e) => handleInputChange(e)}>
                        <option>--Choose sizes--</option>
                        {
                            sizesArray && sizesArray?.map((elm) => {
                                return (
                                    <option
                                        value={elm}
                                    >
                                        {elm}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label>Categories:</label>
                    <select
                        className="form-input"
                        name="categories"
                        onChange={(e) => handleInputChange(e)}>
                        <option>--Choose categories--</option>
                        {
                            categoriesArray && categoriesArray?.map((elm) => {
                                return (
                                    <option
                                        value={elm}
                                    >
                                        {elm}
                                    </option>
                                )
                            })
                        }
                    </select>
                </form>
            </section>
        </div >
    )
}
