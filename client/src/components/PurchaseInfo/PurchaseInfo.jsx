import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { purchaseInfo, singlePurchase } from '../../redux/actions';
import { Link } from "react-router-dom";
import './PurchaseInfo.scss'

export default function PurchaseInfo() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const purchase = useSelector(state => state.singlePurchaseInfo)


    useEffect(() => {
        dispatch(singlePurchase(user.uid));
    }, [dispatch]);

    return (
        <div className='purchaseInfoContainer'>
            {
                purchase.length > 0 ? purchase.map(m => {
                    return (
                        <div className='singlePurchaseContainer'>
                            <div className='purchaseCard'>
                                <div className='purchaseHeader'>
                                    <div>{m.product.map(p => {
                                        return (
                                            <div className='itemContainer'>
                                                <h3>{p[0]}</h3><br />
                                            </div>
                                        )
                                    })}
                                    </div>
                                    <div className='mapContainer'>{m.product.map(p => {
                                        return (
                                            <div className='itemContainer2'>
                                                <h5>Talle: {p[1]}</h5><br />
                                            </div>
                                        )
                                    })}
                                    </div>
                                    <div className='mapContainer'>{m.product.map(p => {
                                        return (
                                            <div className='itemContainer2'>
                                                <h5>Cantidad: {p[2]}</h5><br />
                                            </div>
                                        )
                                    })}
                                    </div>
                                    <div className='mapContainer'>{m.product.map(p => {
                                        return (
                                            <div className='itemContainer2'>
                                                <h5>Precio: {p[3]}</h5><br />
                                            </div>
                                        )
                                    })}
                                    </div>
                                    <div className='mapContainer'>{m.product.map(p => {
                                        return (
                                            <div className='itemContainer2'>
                                                <h5>{p[4]}</h5><br />
                                            </div>
                                        )
                                    })}
                                    </div>
                                    <div className='mapContainer'>{m.idProducts.map(p => {
                                            return (
                                                <button className='btnPrincipal'><Link to={`/details/${p[0]}`}>Ver producto</Link></button>
                                            )
                                        })}
                                        </div>
                                    {
                                        m.orderStatus === 'pending' ? <div>{null}</div> : 
                                        <div className='mapContainer'>{m.idProducts.map(p => {
                                            return (
                                                <button className='btnPrincipal'><Link to={`/${p[0]}`}>Valorar</Link></button>
                                            )
                                        })}
                                        </div>
                                    }
                                </div>
                                <div className='dateContainer'>
                                    <span>Fecha de compra: {m.date}</span>
                                </div>
                            </div>
                        </div>
                    )
                }) : <div><h2>No se ha realizado ninguna compra</h2></div>
            }
        </div>
    )
}