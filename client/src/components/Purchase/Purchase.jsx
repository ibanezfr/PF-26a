import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatNumber } from '../../Utils/index'
import { useTranslation } from 'react-i18next';
import './FastPurchase.scss'
// const API_KEY = 'pk_test_51LRM01FTo7BILoUXakAa8q2EIaJlH9MDt7XKPEFjp9FjQb3vOYrWSgvcbqQZRr1koqulG4m9wpAiLTmUBMoyu8DC00dDBGg6oB'

import Buy from "../Buy/Buy";
import Button from "react-bootstrap/esm/Button";


export default function Purchase() {
    const { t } = useTranslation();
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
                <h2>{t('purchase.data')}</h2>
                <form>
                    <h3>{t('purchase.question')}</h3>
                    <label>{t('purchase.country')}</label>
                    <input type="text" name={"country"} value={info.country} onChange={e => handleChange(e)}></input>
                    <label>{t('purchase.province')}</label>
                    <input type="text" name={"province"} value={info.province} onChange={e => handleChange(e)}></input>
                    <label>{t('purchase.city')}:</label>
                    <input type="text" name={"city"} value={info.city} onChange={e => handleChange(e)}></input>
                    <label>{t('purchase.street')}</label>
                    <input type="text" name={"street"} value={info.street} onChange={e => handleChange(e)}></input>
                    <label>{t('purchase.postalCode')}</label>
                    <input type="text" name={"postalCode"} value={info.postalCode} onChange={e => handleChange(e)}></input>
                    <label>{t('purchase.phoneNumber')}</label>
                    <input type="text" name={"phoneNumber"} value={info.phoneNumber} onChange={e => handleChange(e)}></input>
                </form>
            </div>
            <div>
                <h2>{t('purchase.totalPrice')}{precioTotal ? formatNumber(precioTotal) : 0}</h2>
                <Link to='/cart'><Button>{t('purchase.goBack')}</Button></Link>

                <Buy setShow={setShow} show={show} total={precioTotal} products={cart} shippingInfo={info} />
                <Button variant="primary" onClick={() => setShow(true)}>
                    {t('purchase.payButton')}
                </Button>


            </div>
        </div>
    )
}
