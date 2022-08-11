import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Buy.css";
import { clearCart } from "../../redux/actions";
import { useDispatch } from 'react-redux';
import { BASE_URL } from "../../api_url/api_url";

export default function CheckoutForm({ user, total, products, setShow, setShowPay }) {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  async function showSucces(user, total, products ) {
    const saveOrder = await axios.post('pay/api/checkout/confirm', {
      user: user,
      amount: total,
      description: products
    })
    if (saveOrder.data.message === 'Pago exitoso') {
      dispatch(clearCart());
      return Swal.fire({
        title: 'Compra realizada con éxito!',
        text: "Te llegará la información de la misma a tu casilla de correo",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Volver al inicio'
      }).then((result) => {
        if (result.isConfirmed) {
          setShow ? setShow(false) : history.push("/");
        } else setShowPay(false);
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${BASE_URL}`
      },
      redirect: "if_required"
    })

    if (error) {
      if (error.code === 'incomplete_number') {
        Swal.fire({
          icon: 'warning',
          title: t('checkOutForm.cardAlert.title1')
        });
        setIsLoading(false);
      };
      if (error.code === 'invalid_number') {
        Swal.fire({
          icon: 'warning',
          title: t('checkOutForm.cardAlert.title2')
        });
        setIsLoading(false);
      }
      Swal.fire({
        icon: 'warning',
        title: "Faltan datos de la tarjeta"
      });
      setIsLoading(false);
    }
    else {
      await showSucces(user, total, products)
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
  };
 
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button className='btnPrincipal' disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : t('checkOutForm2.payNow')}
        </span>
      </button>
    </form>
  );
}
