import "./ProductCreationForm";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import { postProduct } from "../../redux/actions";

export function validate(input, name, value) {
    const validName = /^(?=.{5,70}$)[a-zA-ZáéíóúñÑÁÉÍÓÚüÜ' ',.]+(?:-[a-zA-Z]+)*$/;
    const validDescription = /^(?=.{5,255}$)[a-zA-ZáéíóúñÑÁÉÍÓÚüÜ' ',.]+(?:-[a-zA-Z]+)*$/;
    const validPrice = /^((?!0)\d{1,4}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/;
    const validColor = /^(?=.{3,70}$)[a-zA-ZáéíóúñÑÁÉÍÓÚüÜ' ',.]+(?:-[a-zA-Z]+)*$/

    const noName = "1) NAME: A name is required.";
    const invalidName = "1) NAME: Only letters, optional middle hyphen, length within 5 and 70 characters.";
    const noDescription = "2) DESCRIPTION: A description is required.";
    const invalidDescription = "2) DESCRIPTION: Only letters, commas, dots, length within 5 and 255 characters."
    const noPrice = "3) PRICE: A price is required."
    const invalidPrice = "3) PRICE: 4 digits maximum and 2 decimal numbers allowed, dot notation required."
    const noColor = "4) COLOR: A color is required."
    const invalidColor = "4) COLOR: Only letters, 3 characters minimum 70 maximum, commas and dots allowed."
    const noImage = "5) IMAGE: At least 1 image is required."
    let errors = {};
    input.image === "" ? errors[name] = noImage : delete errors.image;
    switch (name) {
        case "name":
            !input[name] ? errors[name] = noName : !validName.test(input[name]) ? errors[name] = invalidName : delete errors[name];
            break;
        case "description":
            !input[name] ? errors[name] = noDescription : !validDescription.test(input[name]) ? errors[name] = invalidDescription : delete errors[name];
            break;
        case "price":
            !input[name] ? errors[name] = noPrice : !validPrice.test(input[name]) ? errors[name] = invalidPrice : delete errors[name];
            break;
        case "color":
            !input[name] ? errors[name] = noColor : !validColor.test(input[name]) ? errors[name] = invalidColor : delete errors[name];
            break;
        default:
            break;
    }
    return errors;
}

export default function ProductCreationForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const stockArray = [];
    for (let i = 0; i <= 100; i++) { stockArray.push(i) }
    const categoriesArray = useSelector((state) => state.categories);
    const sizesArray = ["xs", "s", "l", "m", "xl", "xxl", "xxxl", "único"]
    const [input, setInput] = useState({
        name: "",
        price: 0,
        description: "",
        color: "",
        image: "",
        image2: "",
        image3: "",
        image4: "",
        rating: 0,
        categories: [],
        product_values: [],
    })
    const [productsValues, setProductsValues] = useState({})
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name" || name === "description" || name === "color" || name === "price") {
            setErrors(validate({ ...input, [name]: value }, name))
        }
        if (name === "size") {
            setProductsValues({ [name]: value })
        }
        if (name === "stock") {
            setProductsValues({ ...productsValues, [name]: value })
        }

    }

    if (productsValues.hasOwnProperty("stock") && productsValues.hasOwnProperty("size")) {
        const obj = productsValues;
        setInput({ ...input, product_values: [...input.product_values, obj] });
        setProductsValues({});
    }
    // console.log(input);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postProduct(input))
        setInput({
            name: "",
            price: 0,
            description: "",
            color: "",
            image: "",
            image2: "",
            image3: "",
            image4: "",
            rating: 0,
            categories: [],
            product_values: []
        })
        history.push("/admin/home")
    }

    console.log(errors);


    return (
        <div>
            <div className="login">
                <Link to="/admin/home"><button>Back to dashboard</button></Link>
                <section id="login-window">
                    <h1>Product Creation Form</h1>
                    <p className="error">
                        {/* { && <span className="Error"></span>} */}
                    </p>
                    <ul className="error">

                        {errors && errors.name ? <li className="error">{errors.name}</li> : <br />}
                        {errors && errors.description ? <li className="error">{errors.description}</li> : <br />}
                        {errors && errors.price ? <li className="error">{errors.price}</li> : <br />}
                        {errors && errors.color ? <li className="error">{errors.color}</li> : <br />}
                    </ul>
                    <form onSubmit={((e) => handleSubmit(e))}>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Your product's name..."
                            name="name"
                            onChange={(e) => handleInputChange(e)}
                        ></input>
                        <textarea
                            className="textarea-input"
                            placeholder="Your description..."
                            name="description"
                            rows="4"
                            cols="50"
                            onChange={(e) => handleInputChange(e)}
                        ></textarea>
                        <input
                            className="form-input"
                            type="number"
                            placeholder="Your product's price..."
                            name="price"
                            min="0"
                            max="50000"
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
                            // name="image1"
                            type="image"
                            multiple={false}
                            onDone={({ base64 }) => setInput({ ...input, image: base64 })}
                        />
                        <label >Image 2: </label>
                        <FileBase
                            name="image2"
                            type="image"
                            multiple={false}
                            onDone={({ base64 }) => setInput({ ...input, image2: base64 })}
                        />
                        <label >Image 3: </label>
                        <FileBase
                            name="image3"
                            type="image"
                            multiple={false}
                            onDone={({ base64 }) => setInput({ ...input, image3: base64 })}
                        />
                        <label >Image 4: </label>
                        <FileBase
                            name="image4"
                            type="image"
                            multiple={false}
                            onDone={({ base64 }) => setInput({ ...input, image4: base64 })}
                        />

                        <label>Categories:</label>
                        <select
                            className="form-input"
                            name="categories"
                            onChange={(e) => setInput({ ...input, categories: [...input.categories, { "name": e.target.value }] })}>
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
                        <select
                            className="form-input"
                            name="stock"
                            onChange={(e) => handleInputChange(e)}
                        >
                            {
                                stockArray && stockArray.map((elm, index) => {
                                    return (
                                        <option key={index}>
                                            {elm}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <ul className="sizeStock">
                            {
                                input.product_values && input.product_values.map(elm => {
                                    if (elm.stock === undefined) {
                                        return (<li> size: {elm.size}</li>)
                                    } else {
                                        return (
                                            <li>The size {elm.size} has {elm.stock} units. </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <input
                            disabled={input.name === "" || input.price === 0 || input.description === "" || input.color === "" || input.image === "" || input.categories.length === 0 || input.product_values.length === 0}
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </section>
            </div >

        </div>
    )
}
/*
name: "",
        price: 0,
        description: "",
        color: "",
        image: "",
        image2: "",
        image3: "",
        image4: "",
        status: "",
        categories: [],
        product_values: [],
*/
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
