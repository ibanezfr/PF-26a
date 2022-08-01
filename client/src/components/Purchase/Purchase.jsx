// import {
//     Elements,
//     CardElement,
//     useStripe,
//     useElements,
// } from "@stripe/react-stripe-js";
import {
    Elements,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "../Cart/CheckoutForm"
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import { formatNumber } from '../../Utils/index'
// const API_KEY = 'pk_test_51LRM01FTo7BILoUXakAa8q2EIaJlH9MDt7XKPEFjp9FjQb3vOYrWSgvcbqQZRr1koqulG4m9wpAiLTmUBMoyu8DC00dDBGg6oB'



const stripePromise = loadStripe("pk_test_51LDapSLLyNiW7nbRKQmdtT1X4QZdNLvQeiksAHJoCUcIdwVVJCSr5wSzYHQAH6s0GEYcWZtfKa6SnAUrpIBtAYVc00IIKUjC8f");


export default function Purchase() {

    const cart = useSelector((state) => state.cart);

    if (cart[0]) {
        var cantidadPrecio = []
        cart.map((p) => cantidadPrecio.push(p.price) && cantidadPrecio.push(p.quantity))

        var precioTotal = 0
        for (let i = 0; i < cantidadPrecio.length; i += 2) {
            precioTotal += cantidadPrecio[i] * cantidadPrecio[i + 1]
        }
    };

    const [info, setInfo] = useState({
        country: "",
        province: "",
        city: "",
        postalCode: "",
        phoneNumber: ""
    })

    const handleChange = (e) => {
        e.preventDefault();
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    }

    //console.log("Datos del form: ", info)
    console.log()

    return (
        <div>
            <div>
                <h2>Datos</h2>
                <form>
                    <h3>¿Donde querés recibir tu compra?</h3>
                    <label>Pais:</label>
                    <input type="text" name={"country"} value={info.country} onChange={e => handleChange(e)}></input>
                    <label>Provincia:</label>
                    <input type="text" name={"province"} value={info.province} onChange={e => handleChange(e)}></input>
                    <label>Ciudad:</label>
                    <input type="text" name={"city"} value={info.city} onChange={e => handleChange(e)}></input>
                    <label>Código postal:</label>
                    <input type="text" name={"postalCode"} value={info.postalCode} onChange={e => handleChange(e)}></input>
                    <label>Número de teléfono:</label>
                    <input type="text" name={"phoneNumber"} value={info.phoneNumber} onChange={e => handleChange(e)}></input>
                </form>

                <Elements stripe={stripePromise}>
                    <div className="containerPayment">
                        <div className="row h-100">
                            <div className="col-md-4 offset-md-4 h-100">
                                <CheckoutForm total={formatNumber(precioTotal)} products={cart} shippingInfo={info} />
                            </div>
                        </div>
                    </div>
                </Elements>
            </div>
            <div>
                <h2>Precio total: ${precioTotal ? formatNumber(precioTotal) : 0}</h2>
                <Link to='/cart'><button>Volver al carrito</button></Link>
            </div>

        </div>
    )
}
