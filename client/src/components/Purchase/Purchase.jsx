import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "../Cart/CheckoutForm"
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";



const stripePromise = loadStripe("pk_test_51LDapSLLyNiW7nbRQYImFmTBLwYKDGGcm8FGuW5bCepjRqE969YH6eAoS8q7mhBpAkXYPYH9T002QhQfVXDcGd7w00kRYp2bdI");


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

    const handleChange = (e)=>{
        e.preventDefault();
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        });
    }
    
    console.log("Datos del form: ", info)


    return (
        <div>
            <div>
            <h2>Datos</h2>
            <form>
                <h3>¿Donde querés recibir tu compra?</h3>
                <label>Pais:</label>
                <input type="text" name={"country"} value={info.country} onChange={e=>handleChange(e)}></input>
                <label>Provincia:</label>
                <input type="text" name={"province"} value={info.province} onChange={e=>handleChange(e)}></input>
                <label>Ciudad:</label>
                <input type="text" name={"city"} value={info.city} onChange={e=>handleChange(e)}></input>
                <label>Código postal:</label>
                <input type="text" name={"postalCode"} value={info.postalCode} onChange={e=>handleChange(e)}></input>
                <label>Número de teléfono:</label>
                <input type="text" name={"phoneNumber"} value={info.phoneNumber} onChange={e=>handleChange(e)}></input>
            </form>
            
            <Elements stripe={stripePromise}>
                <div className="containerPayment">
                    <div className="row h-100">
                        <div className="col-md-4 offset-md-4 h-100">
                            <CheckoutForm total={precioTotal} products={cart} shippingInfo={info}/>
                        </div>
                    </div>
                </div>
            </Elements>
            </div>
            <div>
                <h2>Precio total: ${precioTotal}</h2>
                <Link to='/cart'><button>Volver al carrito</button></Link>
            </div>

        </div>
    )
}