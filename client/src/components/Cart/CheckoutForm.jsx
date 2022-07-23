import React, { useState } from "react";


import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";


export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
  
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
          const { data } = await axios.post(
            "http://localhost:3001/pay/api/checkout",
            {
              id,
              amount: 10000, //cents
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
  
    return (
      <form className="card card-body" onSubmit={handleSubmit}>
        
  
        {/* User Card Input */}
        <div className="form-group">
          <CardElement />
        </div>
  
        <button disabled={!stripe} className="btn btn-success">
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Buy"
          )}
        </button>
      </form>
    );
  };