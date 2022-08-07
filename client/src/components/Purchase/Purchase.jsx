import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatNumber } from '../../Utils/index'

import Buy from "../Buy/Buy";
import Button from "react-bootstrap/esm/Button";


export default function Purchase() {
    const cart = useSelector((state) => state.cart);
    const [show, setShow] = useState(false);

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
        street: "",
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
                    <label>Calle:</label>
                    <input type="text" name={"street"} value={info.street} onChange={e => handleChange(e)}></input>
                    <label>Código postal:</label>
                    <input type="text" name={"postalCode"} value={info.postalCode} onChange={e => handleChange(e)}></input>
                    <label>Número de teléfono:</label>
                    <input type="text" name={"phoneNumber"} value={info.phoneNumber} onChange={e => handleChange(e)}></input>
                </form>
            </div>
            <div>
                <h2>Precio total: ${precioTotal ? formatNumber(precioTotal) : 0}</h2>
                <Link to='/cart'><button>Volver al carrito</button></Link>
                <Buy setShow={setShow} show={show} total={precioTotal} products={cart} shippingInfo= {info}/>
                <Button variant="primary" onClick={() => setShow(true)}>
                    Pagar!
                </Button>
            </div>
        </div>
    )
}
