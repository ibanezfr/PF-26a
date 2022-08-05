import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext'
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

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
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const history = useHistory();


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
    console.log(error)
    if (!error) {
      //console.log(elements.getElement(CardElement))
      console.log('no error')
      if (!user) window.Swal.fire({
        title: 'No estás logueado',
        text: "Para poder realizar esta acción debes loguearte primero!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iniciar sesión'
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
            localStorage.removeItem('cart')
            Swal.fire({
              title: 'Compra realizada con éxito!',
              text: "Te llegará la información de la misma a tu casilla de correo",
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Volver al inicio'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  history.push("/")
                )
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

      <button disabled={!stripe || !products.length} className="btn btn-success">
        {loading && user ? (/* agregue user para que valide el log */
          <div className="spinner-border text-light" role="status">
            <span className="sr-only"> </span>{/* cambio loading para que quede solo el spinner */}
          </div>
        ) : (
          "Comprar"
        )}
      </button>
    </form>
  );
};
