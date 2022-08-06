import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { purchaseInfo } from '../../redux/actions';

export default function PurchaseInfo (){
    const { user } = useAuth();
    const dispatch = useDispatch();
    const purchase = useSelector(state => state.purchaseInfo)

    console.log("purchase: ", purchase)

    useEffect(() => {
        dispatch(purchaseInfo(user.uid));
    }, [dispatch]);

    return(
        <div>
            {
                purchase.length>0? purchase.map(m=>{
                    return(
                        <div>
                        <h3>{m.product}</h3>
                        {
                            m.orderStatus === 'pending' ? <div><span>Ya podés pasar a retirar tu producto</span></div> :
                            <div><span>Danos tu valoración</span><button>Valorar Producto</button></div>
                        }
                    </div>
                    )
                }) : <div><h2>No se ha realizado ninguna compra</h2></div>
            }
        </div>
    )
}