import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProductsById, getReview, reviewProduct } from "../../redux/actions";

export default function Review() {
  let { id } = useParams();
  let getInfoReview = useSelector(state => state.infoReview)
  const [review, setReview] = useState({
    title: "",
    description: "",
    rating: 1,
  })
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsById(id))
    dispatch(reviewProduct(id))
  }, [dispatch, id]);

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
    <div className="">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={review.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={review.description}
            onChange={handleChange}
            required
          />


          <select name="" id="" value={review.rating} onChange={handleChangeCat}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button onClick={e => handleSubmit(e)}>
            Enviar
          </button>
        </div>
      </form>

      <div className="">

        {
          getInfoReview.reviews?.map((info) => {
            return (

              <div>
                <p>{info.rating}</p>
                <p>{info.title}</p>
                <p>{info.description}</p>
              </div>


            )

          })
        }
      </div>
    </div>


  );
}
