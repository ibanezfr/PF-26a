import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from '../../context/AuthContext'
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import "./Buy.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LDapSLLyNiW7nbRKQmdtT1X4QZdNLvQeiksAHJoCUcIdwVVJCSr5wSzYHQAH6s0GEYcWZtfKa6SnAUrpIBtAYVc00IIKUjC8f");

export default function Buy({ setShow, show, total ,products, shippingInfo}) {
  const [clientSecret, setClientSecret] = useState("");
  //const {total, products, shippingInfo} = useSelector(store=>store.paymentInfo)
  const { user } = useAuth()

  
 useEffect( () => {
    // Create PaymentIntent as soon as the page loads
    //  fetch("/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    // })
    //   .then((res) => res.json())
    async function sendPay(){
    const {data} = await axios.post("/pay/api/checkout",
    // JSON.stringify(
      {
        //amount: total,
        amount: total,
        description: products,//array de objetos product
        user: user.uid,//le mando el objeto user
        shippingInfo: shippingInfo
    }
    //)
    ,{credentials: 'include'})
    setClientSecret(data.clientSecret)
    console.log('buy', total, products, shippingInfo)
    }
    sendPay()  
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

  console.log('secret',clientSecret)
  return (
    <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Custom Modal Styling
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="Buy">
                    asdfasdfasdfsadfsadfsadf
                    {clientSecret && (
                      <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                      </Elements>
                    )}
                    aaaaaaaaaaaaaaaaaaasadfasdfsadfasd
                  </div>
                </Modal.Body>
            </Modal>
        </>






    
  );
}