import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import FileBase from "react-file-base64";
import Carousel from "react-bootstrap/Carousel";

import axios from "axios";

export function validate(input, name, value) {
  const validName = /^(?=.{5,70}$)[a-zA-ZáéíóúñÑÁÉÍÓÚüÜ' ',.]+(?:-[a-zA-Z]+)*$/;
  const validDescription =
    /^(?=.{5,255}$)[a-zA-ZáéíóúñÑÁÉÍÓÚüÜ' ',.:;!¡¿?]+(?:-[a-zA-Z]+)*$/;
  const validPrice = /^((?!0)\d{1,4}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/;
  const validColor =
    /^(?=.{3,70}$)[a-zA-ZáéíóúñÑÁÉÍÓÚüÜ' ',.]+(?:-[a-zA-Z]+)*$/;

  const noName = "1) Título: El nombre es obligatorio.";
  const invalidName =
    "1) Título: Solo letras, guión medio opcional y la longitud debe ser entre 5 y 70 caracteres.";
  const noDescription = "2) Descripción: La descripción es obligatoria.";
  const invalidDescription =
    "2) Descripción: Solo letras, comas, puntos y la longitued debe ser entre 5 y 255 caracteres.";
  const noPrice = "3) Precio: El precio es obligatorio.";
  const invalidPrice =
    "3) Precio: Máximo 4 dígitos y 2 decimales permitidos, utilizar punto en vez de coma.";
  const noColor = "4) Color: El color es obligatorio.";
  const invalidColor =
    "4) Color: Solos letras, longitud entre 3 y 70 caracteres, comas y puntos permitidos.";
  const noImage = "5) Imagen: Es obligatoria al menos una imagen.";
  let errors = {};
  input.image === "" ? (errors[name] = noImage) : delete errors.image;
  switch (name) {
    case "name":
      !input[name]
        ? (errors[name] = noName)
        : !validName.test(input[name])
        ? (errors[name] = invalidName)
        : delete errors[name];
      break;
    case "description":
      !input[name]
        ? (errors[name] = noDescription)
        : !validDescription.test(input[name])
        ? (errors[name] = invalidDescription)
        : delete errors[name];
      break;
    case "price":
      !input[name]
        ? (errors[name] = noPrice)
        : !validPrice.test(input[name])
        ? (errors[name] = invalidPrice)
        : delete errors[name];
      break;
    case "color":
      !input[name]
        ? (errors[name] = noColor)
        : !validColor.test(input[name])
        ? (errors[name] = invalidColor)
        : delete errors[name];
      break;
    default:
      break;
  }
  return errors;
}

const UpdateProd = () => {
  const history = useHistory();
  const { id } = useParams();

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
  });

  const [productsValues, setProductsValues] = useState({});
  const categoriesArray1 = useSelector((state) => state.categories);
  const categoriesArray = categoriesArray1.sort();
  const sizesArray = ["xs", "s", "l", "m", "xl", "xxl", "xxxl", "único"];
  const stockArray = [];
  for (let i = 0; i <= 100; i++) {
    stockArray.push(i);
  }
  const [errors, setErrors] = useState();

  const handleKick = async () => {
    const check = await JSON.parse(localStorage.getItem("isAdmin"));
    if (!check) {
      history.push("/login");
    }
  };
  const getProduct = async () => {
    let { data } = await axios.get("http://localhost:3001/products/" + id);
    let categorias = [];

    // data.categories.forEach((e) => {
    //   categorias.push(e.name);
    // });
    // data.categories = categorias;
    const { categories } = data;
    for (const cats of categories) {
      const { name } = cats;
      categorias.push(name);
    }
    data.categories = categorias;
    console.log(data.categories);

    setInput(data);
    console.log(input.categories);
  };

  useEffect(() => {
    handleKick();
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "name" ||
      name === "description" ||
      name === "color" ||
      name === "price"
    ) {
      setErrors(validate({ ...input, [name]: value }, name));
    }
    if (name === "size") {
      setProductsValues({ [name]: value });
    }
    if (name === "stock") {
      setProductsValues({ ...productsValues, [name]: value });
    }
    if (name === "categories") {
      if (input.categories.length < 3) {
        if (!input.categories.includes(value)) {
          setInput({
            ...input,
            categories: [...input.categories, value],
            // categories: [...input.categories, { name: e.target.value }],
          });
        }
      }
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  if (
    productsValues.hasOwnProperty("stock") &&
    productsValues.hasOwnProperty("size")
  ) {
    const obj = productsValues;
    setInput({ ...input, product_values: [...input.product_values, obj] });
    setProductsValues({});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      price,
      description,
      color,
      image,
      image2,
      image3,
      image4,
      rating,
      categories,
      product_values,
    } = input;
    try {
      const { data } = await axios.put(
        `http://localhost:3001/products/update/${id}`,
        {
          input,
          // name,
          // price,
          // description,
          // color,
          // image,
          // image2,
          // image3,
          // image4,
          // rating,
          // categories,
          // product_values,
        }
      );
      console.log(data);
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
        product_values: [],
      });
      // history.push("/admin/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="productCreationContainer">
      <Link to="/admin/products">
        <button id="back-button">Volver</button>
      </Link>
      <div className="productFormContainer">
        <div className="creation_form">
          <h2 id="title">Edita el producto:</h2>
          <div id="error_container">
            <ul className="error">
              {errors && errors.name && (
                <li className="errorCreation">{errors.name}</li>
              )}
              {errors && errors.description && (
                <li className="errorCreation">{errors.description}</li>
              )}
              {errors && errors.price && (
                <li className="errorCreation">{errors.price}</li>
              )}
              {errors && errors.color && (
                <li className="errorCreation">{errors.color}</li>
              )}
            </ul>
          </div>
          <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
            <div className="sepatarionContainer">
              <fieldset className="fieldset rowItems">
                <legend>Ingresá un título:</legend>
                <input
                  className=""
                  type="text"
                  placeholder="Título..."
                  name="name"
                  id="name-input"
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </fieldset>

              <fieldset className="fieldset rowItems">
                <legend>Ingresá el precio:</legend>
                <input
                  id="price-input"
                  type="number"
                  placeholder="Precio..."
                  name="price"
                  min="0"
                  max="9999.99"
                  step=".01"
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend>Ingresá la descripción:</legend>
              <textarea
                id="textarea"
                className=""
                placeholder="Descripción..."
                name="description"
                rows="2"
                cols="50"
                onChange={(e) => handleInputChange(e)}
              ></textarea>
            </fieldset>

            <fieldset className="fieldset">
              <legend>Ingresá los colores:</legend>
              <input
                id="color-input"
                className=""
                type="text"
                placeholder="Color..."
                name="color"
                onChange={(e) => handleInputChange(e)}
              ></input>
            </fieldset>

            <div className="sepatarionContainer">
              <fieldset id="image1" className="fieldset">
                <legend htmlFor="image1">Imagen 1: </legend>
                <FileBase
                  id="image1"
                  name="image1"
                  type="image"
                  multiple={false}
                  onDone={({ base64 }) => setInput({ ...input, image: base64 })}
                />
              </fieldset>

              <fieldset id="image2" className="fieldset">
                <legend htmlFor="image2">Imagen 2: </legend>
                <FileBase
                  name="image2"
                  type="image"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setInput({ ...input, image2: base64 })
                  }
                />
              </fieldset>
            </div>

            <div className="sepatarionContainer">
              <fieldset id="image3" className="fieldset">
                <legend htmlFor="image3">Imagen 3: </legend>
                <FileBase
                  name="image3"
                  type="image"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setInput({ ...input, image3: base64 })
                  }
                />
              </fieldset>

              <fieldset id="image4" className="fieldset">
                <legend htmlFor="image4">Imagen 4: </legend>
                <FileBase
                  name="image4"
                  type="image"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setInput({ ...input, image4: base64 })
                  }
                />
              </fieldset>
            </div>

            <fieldset id="categories" className="fieldset">
              <legend htmlFor="categories">Categorías:</legend>
              <select
                className=""
                name="categories"
                onChange={(e) => handleInputChange(e)}
              >
                <option key={"21a"}>--Elegí las categorías--</option>
                {categoriesArray &&
                  categoriesArray?.map((elm, index) => {
                    return (
                      <option value={elm} key={index}>
                        {elm}
                      </option>
                    );
                  })}
              </select>
            </fieldset>
            {/* <span>In order to add a size-stock pair succesfully, you must first select only one size and then select only one quantity. You'll know you did it well if a phrase appears bellow the stock select.</span> */}
            <br />

            <fieldset id="size_stock" className="fieldset">
              <div className="sepatarionContainer">
                <div className="fieldset rowItems">
                  <legend htmlFor="size_stock">Talle y stock:</legend>
                  <select
                    className=""
                    name="size"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option key={"22a"}>--Seleccioná un talle--</option>
                    {sizesArray &&
                      sizesArray?.map((elm, index) => {
                        return (
                          <option value={elm} key={index}>
                            {elm}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="fieldset rowItems">
                  <label>Stock:</label>
                  <select
                    className=""
                    name="stock"
                    onChange={(e) => handleInputChange(e)}
                  >
                    {stockArray &&
                      stockArray.map((elm, index) => {
                        return <option key={index}>{elm}</option>;
                      })}
                  </select>
                </div>
              </div>
            </fieldset>

            <input
              id="submit-button"
              type="submit"
              value="Submit"
              className="submitBtn"
            />
          </form>
        </div>
      </div>
      <div className="productView">
        <h2 id="title">Previsualización:</h2>
        <div className="background">
          <div className="imagesCreate">
            <Carousel fade>
              {input.image && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image}
                    alt="not found"
                  />
                </Carousel.Item>
              )}
              {input.image2 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image2}
                    alt="not found"
                  />
                </Carousel.Item>
              )}
              {input.image3 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image3}
                    alt="not found"
                  />
                </Carousel.Item>
              )}
              {input.image4 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image4}
                    alt="not found"
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </div>

          {input.name.length !== 0 && <h2>{input.name}</h2>}

          {input.price.length !== 0 && <h3>${input.price}</h3>}

          {input.description.length !== 0 && <p>{input.description}</p>}

          {input.color.length !== 0 && <span>Color: {input.color}</span>}

          <br />

          {input.categories.length !== 0 && (
            <label htmlFor="categories-list" id="categories-list-label">
              Categorías:
            </label>
          )}

          <ul className="categories" id="categories-list">
            {input.categories.join(", ")}
            {/* {input.categories.map((elm, index) => {
              return <li key={index}>{elm.name}</li>;
            })} */}
          </ul>
          <ul className="size-stock">
            {input.product_values &&
              input.product_values.map((elm, index) => {
                return (
                  <li key={index}>
                    Hay <mark>{elm.stock}</mark> unidades del talle{" "}
                    <mark>{elm.size}</mark>{" "}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpdateProd;
