import "./ProductCreationForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
//   {
//         "name": "Bochas",
//         "description": "Encontrá estas bochas en nuestro local o compralas por nuestra tienda virtual para poder potenciar tu entrenamiento al máximo",
//         "price": 500,
//         "rating": 5,
//         "color": "rosa",
//         "image": "https://i.pinimg.com/originals/8c/64/12/8c64122297b0ea576b1d9fdbf0673875.jpg",
//         "categories": [
//             {
//                 "name": "Equipamento deportivo"
//             }
//         ],
//         "product_values": [
//             {
//                 "size": "único",
//                 "stock": 40
//             }
//         ]
//     }
export function validate() {

}

export default function ProductCreationForm() {
    const history = useHistory();
    const categoriesArray = useSelector((state) => state.categories);
    const sizesArray = ["xs", "s", "l", "m", "xl", "xxl", "xxxl", "único"]
    // console.log(categoriesArray);
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
        categories: [],
        products_values: [],
    })
    // const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {
        console.log(`El name del e: ${e.target.name}`);
        console.log(`El value del e: ${e.target.value}`);
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
                <form onSubmit={((e) => handleSubmit(e))}>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Your product's name..."
                        name="name"
                        onChange={(e) => setInput({ ...input, name: e.target.value })}
                    ></input>
                    <input
                        className="form-input"
                        type="number"
                        placeholder="Your product's price..."
                        name="price"
                        min="0"
                        max="50000"
                        onChange={(e) => setInput({ ...input, price: e.target.value })}
                    ></input>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Your product's color..."
                        name="color"
                        onChange={(e) => setInput({ ...input, color: e.target.value })}
                    ></input>
                    <label >Image 1: </label>
                    <FileBase
                        name="image1"
                        type="image"
                        multiple={false}
                        onDone={({ FileBase }) => setInput({ ...input, image: FileBase })}
                    />
                    <label >Image 2: </label>
                    <FileBase
                        name="image2"
                        type="image"
                        multiple={false}
                        onDone={(e) => handleInputChange(e)}
                    />
                    <label >Image 3: </label>
                    <FileBase
                        name="image3"
                        type="image"
                        multiple={false}
                        onDone={(e) => handleInputChange(e)}
                    />
                    <label >Image 4: </label>
                    <FileBase
                        name="image4"
                        type="image"
                        multiple={false}
                        onDone={(e) => handleInputChange(e)}
                    />
                    <input
                        className="form-input"
                        type="number"
                        placeholder="Your product's stock..."
                        name="stock"
                        onChange={(e) => handleInputChange(e)}
                    ></input>
                    <label>Categories:</label>
                    <select
                        className="form-input"
                        name="categories"
                        onChange={(e) => setInput({ ...input, categories: [...input.categories, e.target.value] })}>
                        <option key={"21a"}>--Choose categories--</option>
                        {
                            categoriesArray && categoriesArray?.map((elm, index) => {
                                return (
                                    <option
                                        value={elm}
                                        key={index}
                                    >
                                        {elm}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label>Size:</label>
                    <select
                        className="form-input"
                        name="size"
                        onChange={(e) => handleInputChange(e)}>
                        <option key={"22a"}>--Choose sizes--</option>
                        {
                            sizesArray && sizesArray?.map((elm, index) => {
                                return (
                                    <option
                                        value={elm}
                                        key={index}
                                    >
                                        {elm}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label>Stock:</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        onChange={(e) => handleInputChange(e)}
                    >
                    </input>
                </form>
            </section>
        </div >
    )
}
