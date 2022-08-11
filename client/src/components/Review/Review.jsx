import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProductsById, getReview, reviewProduct } from "../../redux/actions";
import './Review.scss'
import opinion from '../../images/opinion.png'

export default function Review() {
  let { id } = useParams();
  // let getInfoReview = useSelector(state => state.infoReview)
  const [review, setReview] = useState({
    title: "",
    description: "",
    rating: 1,
  })
  const dispatch = useDispatch();

  let actualProduct = useSelector(state => state.detail)

  useEffect(() => {
    dispatch(getProductsById(id))
    dispatch(reviewProduct(id))
  }, [dispatch, id]);

  const [formError, setFormError] = useState(true);

  const [isSubmit, setisSubmit] = useState(true);

  // console.log("question before", question)
  function validString(data) {
    let errors = {}
    if (data.title.length < 1 || data.title.length > 255) errors.title = "El título debe tener más de 1 catácter y menos de 255";
    if (typeof data.title !== "string") errors.title = "La información enviada debe ser de tipo string";
    if (data.description.length < 1 || data.description.length > 255) errors.description = "La descripción debe tener más de 1 catácter y menos de 255";
    if (typeof data.description !== "string") errors.description = "La información enviada debe ser de tipo string";

    if ((Object.keys(errors).length) === 0) {
      setisSubmit(false)
    };

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(getReview(id, review))
    setReview({
      title: "",
      description: ""
    })

  };
  const handleChange = (e) => {
    e.preventDefault();
    setFormError(validString(review));
    if ((Object.keys(formError).length) !== 0) {
      setisSubmit(true)
    };
    setReview({
      ...review,
      [e.target.name]: e.target.value
    })
  }
  const handleChangeCat = (e) => {
    e.preventDefault();
    const { value } = e.target;

    setReview({
      ...review,
      rating: value,
    });

  };
  return (
    <div className="fullRevDiv">
      <div className="productRevDiv">
        <img src={actualProduct.image} />
        <h3>{actualProduct.name}</h3>
      </div>
    <div className="revContainer">
      <div className="infoRev">
        <h2>Nos interesa tu opinión</h2>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="formDiv">
            <div className="titleRev">
              <span>Título</span>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={review.title}
                onChange={handleChange}
                required
              />
              {
                formError.title ? (<h4 className="error"><small>{formError.title}</small></h4>) : false
              }
            </div>
            <div className="descriptionRev">
              <span>Contanos tu opinión sobre el producto</span>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={review.description}
                onChange={handleChange}
                required
              />
              {
                formError.description ? (<h4 className="error"><small>{formError.description}</small></h4>) : false
              }
            </div>

            <div className="rateRev">
              <span>Valorá el producto del 1 al 5</span>
              <select name="" id="" value={review.rating} onChange={handleChangeCat}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            <div className="btnRev">
              <button disabled={isSubmit} onClick={e => handleSubmit(e)}>
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="revIlustrationContainer">
        <img className="ilustrationRev" src={opinion} alt="none" />
      </div>
    </div>
    </div>

  );
}
