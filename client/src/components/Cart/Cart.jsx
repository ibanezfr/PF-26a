import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, deleteFromCart } from "../../redux/actions";
import ProductItem from "./ProductItem";
import './Cart.css'

export default function Cart(){
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    if(cart[0]) {
        var cantidadPrecio = []
        cart.map((p) => cantidadPrecio.push(p.price) && cantidadPrecio.push(p.quantity))

        var precioTotal = 0        
        for (let i = 0; i < cantidadPrecio.length; i+=2) {
            precioTotal += cantidadPrecio[i] * cantidadPrecio[i+1]
        }
    };

    return(
        <div className="maxContainer">
           <h2 className="shoppingCartText">Tu carrito de compras</h2>
           <div  className='allCardsContainer'>
           {
               cart[0]?cart.map((product) => 
               <div>
                    <div className="productItemContainer">
                      <ProductItem 
                          key={product.id}
                          data={product} 
                          addToCart={() => dispatch(addToCart(product.id))}
                          deleteOneFromCart={() => dispatch(deleteFromCart(product.id))}
                          deleteAllFromCart={() => dispatch(deleteFromCart(product.id, true))}
                        />
                    </div>
                </div>
            ):
            <div>
               <div className="emptyChartTextContainer">
                   <h2>Upss...</h2>
                   <h3>Tu carrito está vacío</h3>
               </div> 
               <div className="btnContainer">
                   <button className="btnPrincipal">Ver productos</button>
                </div>
            </div>
            }
            <div className="btnContainer">
                <button className="btnPrincipal">Continuar compra</button>
                <button className="secondaryBtn" onClick={()=> dispatch(clearCart())}>Limpiar carrito</button>
            </div>
           </div>
        </div>
    )
}