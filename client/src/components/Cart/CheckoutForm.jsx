import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { clearCart } from "../../redux/actions";
import { useDispatch } from 'react-redux';

// import { loadStripe } from "@stripe/stripe-js";
import {
  // Elements,
  CardElement,//campos de la tarjeta de credito
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import './Cart.scss'

import axios from "axios";


export default function CheckoutForm({ total, products, shippingInfo }) {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();


  const [loading, setLoading] = useState(false);
  console.log(products)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);
    //console.log(user).
    if (error) {
      if (error.code === 'incomplete_number') {
        Swal.fire({
          icon: 'warning',
          title: t('checkOutForm.cardAlert.title1')
        });
        setLoading(false);
      };
      if (error.code === 'invalid_number') {
        Swal.fire({
          icon: 'warning',
          title: t('checkOutForm.cardAlert.title2')
        });
        setLoading(false);
      }
    }
    if (!error) {
      //console.log(elements.getElement(CardElement))
      console.log('no error')
      if (!user) Swal.fire({
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

          elements.getElement(CardElement).clear();
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
      setLoading(false);
    }
  };

  //console.log(!stripe || loading);
  //mostrar alerta de compra exitosa o fallida
  return (
    <form className="card card-body" onSubmit={handleSubmit}>

      {/* User Card Input */}
      <div className="form-group">
        <CardElement style />
      </div>

      <button disabled={!stripe || !products.length || loading} className="btn btn-success">
        {loading && user ? (/* agregue user para que valide el log */
          <div className="spinner-border text-light" role="status">
            <span className="sr-only"> </span>{/* cambio loading para que quede solo el spinner */}
          </div>
        ) : (
          t('checkOutForm.buy')
        )}
      </button>
    </form>
  );
};
