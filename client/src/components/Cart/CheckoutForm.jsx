import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext'

// import { loadStripe } from "@stripe/stripe-js";
import {
  // Elements,
  CardElement,//campos de la tarjeta de credito
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";


export default function CheckoutForm({ total, products }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth()


  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        console.log('total', total)
        const { data } = await axios.post(

          "http://localhost:3001/pay/api/checkout",
          {
            id,
            amount: total,
            description: products,//array de objetos product
            user
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);
  //mostrar alerta de compra exitosa o fallida
  return (
    <form className="card card-body" onSubmit={handleSubmit}>


      {/* User Card Input */}
      <div className="form-group">
        <CardElement />
      </div>
      
      <button disabled={!stripe || !user || !products.length} className="btn btn-success">
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};
