import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity, clearCart, deleteFromCart } from "../../redux/actions";
import ProductItem from "./ProductItem";
import './Cart.scss'
import { formatNumber } from "../../Utils";
import { Link } from "react-router-dom";


export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    console.log(cart)
    // JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handlechangeQuantity = (e, data, boolean) =>{
        e.preventDefault()
        dispatch(changeQuantity(data, boolean))
    }

    const handleDeleteAll = (e, data) =>{
        e.preventDefault()
        dispatch(deleteFromCart(data))

    }

    console.log("carrito: ", cart)
    if (cart[0]) {
        var cantidadPrecio = []
        cart.map((p) => cantidadPrecio.push(p.price) && cantidadPrecio.push(p.quantity))

        var precioTotal = 0
        for (let i = 0; i < cantidadPrecio.length; i += 2) {
            precioTotal += cantidadPrecio[i] * cantidadPrecio[i + 1]
        }
    };


    return (
        <div className="maxContainer">
            <h2 className="shoppingCartText">Tu carrito de compras</h2>
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
                                <h2>Upss...</h2>
                                <h3>Tu carrito está vacío</h3>
                            </div>
                            <div className="btnContainer">
                                <button className="btnPrincipal"><Link to="/">Ver productos</Link></button>
                            </div>
                        </div>
                }
                {
                    cart[0] &&
                        <div className="btnContainer">
                            <div className="totalText">TOTAL ${formatNumber(precioTotal)}</div>
                            {/* <Elements stripe={stripePromise}>
                                <div className="containerPayment p-4">
                                    <div className="row h-100">
                                        <div className="col-md-4 offset-md-4 h-100">
                                            <CheckoutForm total={precioTotal} products={cart} />
                                        </div>
                                    </div>
                                </div>
                            </Elements> */}
                            <button className="btnPrincipal"><Link to='/purchase'>Continuar compra</Link></button>
                            <button className="secondaryBtn" onClick={() => dispatch(clearCart())}>Limpiar carrito</button>
                        </div>
                }
            </div>
        </div>
    )
}
