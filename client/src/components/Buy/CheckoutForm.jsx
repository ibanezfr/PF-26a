import React, { useEffect, useState } from "react";
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
import { async } from "@firebase/util";
import { clearCart } from "../../redux/actions";
import { useDispatch } from 'react-redux';

export default function CheckoutForm({ user, total, products, shippingInfo }) {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory()
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  async function showSucces(user, total, products, shippingInfo) {
    const saveOrder = await axios.post('pay/api/checkout/confirm', {
      user: user,
      amount: total,
      description: products,
      shippingInfo: shippingInfo
    })
    if (saveOrder.data.message = 'Pago exitoso') {
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
          history.push("/")
        }
      })

    }
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(t('checkOutForm2.succeeded'));
          break;
        case "processing":
          setMessage(t('checkOutForm2.processing'));
          break;
        case "requires_payment_method":
          setMessage(t('checkOutForm2.requires_payment_method'));
          break;
        default:
          setMessage(t('checkOutForm2.wentWrong'));
          break;
      }
    });
  }, [stripe]);

//desde stripe
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/"
        //return_url: await showSucces(user, total, products, shippingInfo),
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
    }
    else{
      await showSucces(user, total, products, shippingInfo)
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
/* 
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage(t('checkOutForm2.unexpectedError'));
    }
 */
    setIsLoading(false);
  };
//desde stripe



/* 
const handleSubmit = async (e) => {
  e.preventDefault();
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: elements.getElement(PaymentElement),
  });
  setIsLoading(true);
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
  }
  if (!error) {
    //console.log(elements.getElement(CardElement))
    console.log('no error')
    if (!user) 
    window.Swal.fire({
      title: t('checkOutForm.loginAlert.title'),
      text: t('checkOutForm.loginAlert.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: t('checkOutForm.loginAlert.cancelButtonText'),
      confirmButtonText: t('checkOutForm.loginAlert.confirmButtonText')
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/login")
      }
    })

    else {

      const { id } = paymentMethod;
      try {//console.log('total', total)
        const { data } = await axios.post(

          "/pay/api/checkout",
          {
            id,
            amount: total,
            description: products,//array de objetos product
            user: user.uid,//le mando el objeto user
            shippingInfo
          }
        );
        //console.log(data);

        elements.getElement(PaymentElement).clear();
        if (data.message === 'Successful Payment') {
          dispatch(clearCart());
          Swal.fire({
            title: t('checkOutForm.confirmationAlert.title'),
            text: t('checkOutForm.confirmationAlert.text'),
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: t('checkOutForm.confirmationAlert.cancelButtonText'),
            confirmButtonText: t('checkOutForm.confirmationAlert.confirmButtonText')
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/")
            }
          })
        }
        else Swal.fire({
          title: '<strong>HTML <u>Hubo un error</u></strong>',
          icon: 'info',
          html:
            '<b>No se ha podido realizar el pago</b>',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false
        })
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
  }
};
 */


  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button className='btnPrincipal' disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : t('checkOutForm2.payNow')}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
