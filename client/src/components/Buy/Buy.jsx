import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Buy.css";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LDapSLLyNiW7nbRKQmdtT1X4QZdNLvQeiksAHJoCUcIdwVVJCSr5wSzYHQAH6s0GEYcWZtfKa6SnAUrpIBtAYVc00IIKUjC8f");

export default function Buy() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    /* fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret)); */
      axios.get()
  }, []);

  const appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#794783',
      colorBackground: '#dfced5',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      asdfasdfasdfsadfsadfsadf
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}