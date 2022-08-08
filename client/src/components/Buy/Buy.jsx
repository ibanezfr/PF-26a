import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from '../../context/AuthContext'
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import "./Buy.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LDapSLLyNiW7nbRKQmdtT1X4QZdNLvQeiksAHJoCUcIdwVVJCSr5wSzYHQAH6s0GEYcWZtfKa6SnAUrpIBtAYVc00IIKUjC8f");

export default function Buy({ setShow, show, total, products, shippingInfo }) {
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth()


  useEffect(() => {
    async function sendPay() {
      const { data } = await axios.post("/pay/api/checkout",
        {
          amount: total,
          description: products,//array de objetos product
          shippingInfo: shippingInfo
        }
        , { credentials: 'include' })

      setClientSecret(data.clientSecret)
    }
    sendPay()
  }, []);


  const appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#794783',
      colorBackground: '#F2F2F2',/* DFCED5 */
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  console.log('BUY')
  console.log( total, products, shippingInfo, user.uid )
  console.log('BUY')
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
            Finalizar Compra
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Buy" >
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm total={total} products={products} shippingInfo={shippingInfo} user={user.uid} />
              </Elements>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>







  );
}