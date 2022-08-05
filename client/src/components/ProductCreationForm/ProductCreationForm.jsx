import "./ProductCreationForm.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import { postProduct } from "../../redux/actions";
import { useTranslation, Trans } from 'react-i18next';
import Carousel from "react-bootstrap/Carousel";

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

export default function ProductCreationForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const stockArray = [];
  for (let i = 0; i <= 100; i++) {
    stockArray.push(i);
  }
  const categoriesArray1 = useSelector((state) => state.categories);
  const categoriesArray = categoriesArray1.sort();
  const sizesArray = ["xs", "s", "l", "m", "xl", "xxl", "xxxl", "único"];
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
  const [errors, setErrors] = useState({});

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
        setInput({
          ...input,
          categories: [...input.categories, { name: e.target.value }],
        });
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
  // console.log(input.categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postProduct(input));
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
    history.push("/admin/home");
  };

  const handleKick = async () => {
    const check = await JSON.parse(localStorage.getItem("isAdmin"));
    if (!check) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleKick();
  }, []);

  // console.log(input);
  const submitButtonBoolean =
    input.name === "" ||
      input.price === 0 ||
      input.description === "" ||
      input.color === "" ||
      input.image === "" ||
      input.categories.length === 0 ||
      input.product_values.length === 0
      ? true
      : false;

  return (
    <div className="productCreationContainer">
      <Link to="/admin/home">
        <button id="back-button">{t('productCreationForm.backButton')}</button>
      </Link>
      <div className="productFormContainer">
        <div className="creation_form">
          <h2 id="title">{t('productCreationForm.h1Title')}</h2>
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
                <legend>{t('productCreationForm.legend1')}</legend>
                <input
                  className=""
                  type="text"
                  placeholder={t('productCreationForm.placeHolderLegend1')}
                  name="name"
                  id="name-input"
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </fieldset>

              <fieldset className="fieldset rowItems">
                <legend>{t('productCreationForm.legend2')}</legend>
                <input
                  id="price-input"
                  type="number"
                  placeholder={t('productCreationForm.placeHolderLegend2')}
                  name="price"
                  min="0"
                  max="9999.99"
                  step=".01"
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend>{t('productCreationForm.legend3')}</legend>
              <textarea
                id="textarea"
                className=""
                placeholder={t('productCreationForm.placeHolderLegend3')}
                name="description"
                rows="2"
                cols="50"
                onChange={(e) => handleInputChange(e)}
              ></textarea>
            </fieldset>

            <fieldset className="fieldset">
              <legend>{t('productCreationForm.legend4')}</legend>
              <input
                id="color-input"
                className=""
                type="text"
                placeholder={t('productCreationForm.placeHolderLegend4')}
                name="color"
                onChange={(e) => handleInputChange(e)}
              ></input>
            </fieldset>

            <div className="sepatarionContainer">
              <fieldset id="image1" className="fieldset">
                <legend htmlFor="image1">{t('productCreationForm.legend5')}</legend>
                <FileBase
                  id="image1"
                  name="image1"
                  type="image"
                  multiple={false}
                  onDone={({ base64 }) => setInput({ ...input, image: base64 })}
                />
              </fieldset>

              <fieldset id="image2" className="fieldset">
                <legend htmlFor="image2">{t('productCreationForm.legend6')}</legend>
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
                <legend htmlFor="image3">{t('productCreationForm.legend7')}</legend>
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
                <legend htmlFor="image4">{t('productCreationForm.legend8')}</legend>
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
              <legend htmlFor="categories">{t('productCreationForm.legend9')}</legend>
              <select
                className=""
                name="categories"
                onChange={(e) => handleInputChange(e)}
              >
                <option key={"21a"}>{t('productCreationForm.categorySelect')}</option>
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
                  <legend htmlFor="size_stock">{t('productCreationForm.legend10')}</legend>
                  <select
                    className=""
                    name="size"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option key={"22a"}>{t('productCreationForm.sizeSelect')}</option>
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
                  <label>{t('productCreationForm.labelStock')}</label>
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
              disabled={submitButtonBoolean}
              id="submit-button"
              type="submit"
              value={t('productCreationForm.submit')}
              className="submitBtn"
            />
          </form>
        </div>
      </div>
      <div className="productView">
        <h2 id="title">{t('productCreationForm.preview')}</h2>
        <div className="background">
          <div className="imagesCreate">
            <Carousel fade>
              {input.image && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image}
                    alt={t('productCreationForm.notFound')}
                  />
                </Carousel.Item>
              )}
              {input.image2 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image2}
                    alt={t('productCreationForm.notFound')}
                  />
                </Carousel.Item>
              )}
              {input.image3 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image3}
                    alt={t('productCreationForm.notFound')}
                  />
                </Carousel.Item>
              )}
              {input.image4 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={input.image4}
                    alt={t('productCreationForm.notFound')}
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
              {t('productCreationForm.label1')}
            </label>
          )}

          <ul className="categories" id="categories-list">
            {input.categories &&
              input.categories.map((elm, index) => {
                return <li key={index}>{elm.name}</li>;
              })}
          </ul>
          <ul className="size-stock">
            {input.product_values &&
              input.product_values.map((elm, index) => {
                return (
                  <li key={index}>
                    {t('productCreationForm.sizeStock', { stock: `${elm.stock}`, size: `${elm.size}` })}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
