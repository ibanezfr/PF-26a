import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity, clearCart, deleteFromCart } from "../../redux/actions";
import ProductItem from "./ProductItem";
import './Cart.scss'
import { formatNumber } from "../../Utils";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";
import Buy from "../Buy/Buy";
import Button from "react-bootstrap/esm/Button";

export default function Cart() {
    const { t } = useTranslation();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    // console.log(cart)

    const { user } = useAuth();
    const history = useHistory();
    const [show, setShow] = useState(false);
    // JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handlechangeQuantity = (e, data, boolean) => {
        e.preventDefault()
        dispatch(changeQuantity(data, boolean))
    }

    const handleDeleteAll = (e, data) => {
        e.preventDefault()
        dispatch(deleteFromCart(data))

    }

    // console.log("carrito: ", cart)
    if (cart[0]) {
        var cantidadPrecio = []
        cart.map((p) => cantidadPrecio.push(p.price) && cantidadPrecio.push(p.quantity))

        var precioTotal = 0
        for (let i = 0; i < cantidadPrecio.length; i += 2) {
            precioTotal += cantidadPrecio[i] * cantidadPrecio[i + 1]
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return Swal.fire({
            title: t('cart.alert.title'),
            text: t('cart.alert.text'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('cart.alert.confirmButtonText')
        }).then((result) => {
            if (result.isConfirmed) {
                history.push("/login")
            }
        })
        setShow(true);
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Tu carrito quedara vacio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(clearCart());
                Swal.fire(
                    'Eliminado',
                    'Se eliminaron los productos del carrito',
                    'success'
                );
            };
          });
    }


    return (
        <div className="maxContainer">
            <h2 className="shoppingCartText">{t('cart.shoppingCartText')}</h2>
            <div className='allCardsContainer'>
                {
                    cart[0] ? cart.map((product, index) =>
                        <div key={index}>
                            <div className="productItemContainer">
                                <ProductItem
                                    key={product.id}
                                    data={product}
                                    changeQuantity={handlechangeQuantity}
                                    deleteAllFromCart={handleDeleteAll}
                                />
                            </div>
                        </div>
                    ) :
                        <div>
                            <div className="emptyChartTextContainer">
                                <h2>{t('cart.upps')}</h2>
                                <h3>{t('cart.carritoVacio')}</h3>
                            </div>
                            <div className="btnContainer">
                                <button className="btnPrincipal"><Link to="/">{t('cart.seeProducts')}</Link></button>
                            </div>
                        </div>
                }
                {
                    cart[0] &&
                    <div className="btnContainer">
                        <div className="totalText">{t('cart.totalPrice')}{formatNumber(precioTotal)}</div>
                        <button className="btnPrincipal" onClick={e => handleSubmit(e)}>
                            {t('purchase.payButton')}
                        </button>
                        {
                            show && <Buy setShowPay={setShow} showPay={show} total={precioTotal} products={cart} user={user}/>
                        }
                        <button className="secondaryBtn" onClick={(e) => handleConfirm(e)}>{t('cart.clearCart')}</button>
                    </div>
                }
            </div>
        </div>
    )
}
