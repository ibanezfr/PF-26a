import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bringSize, clearCart, addToCart } from '../../redux/actions';
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next';
import { cartController, formatNumber } from '../../Utils';
import { useAuth } from '../../context/AuthContext';
import './FastPurchase.scss'
import Buy from "../Buy/Buy"; 
import sinStock from "../../images/sinStock.png";

export default function FastPurchase({ setShow, show, image, name, price, id }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useAuth();
    const size = useSelector(state => state.size);
    const cart = useSelector(state => state.cart);
    const [position, setPosition] = useState(0);
    const [showPay, setShowPay] = useState(false);


    useEffect(() => {
        if (show) {
            dispatch(bringSize(id))
        }
    }, [show]);

    const [newCart, setNewCart] = useState({
        id: "",
        name: "",
        img: "",
        size: "",
        price: "",
        stock: size[1],
        quantity: 0
    });

    const handleSize = (e) => {
        e.preventDefault();
        setPosition(parseInt(e.target.value) + 1);
        setNewCart({
            id: id,
            name: name,
            img: image,
            size: size[e.target.value],
            price: price,
            stock: size[parseInt(e.target.value) + 1],
            quantity: 0
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!user) return Swal.fire({
            title: t('fastPurchase.titleNotLoggedIn'),
            text: t('fastPurchase.textNotLoggedIn'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iniciar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                history.push("/login")
            }
        });
        var bool = cartController(Swal, newCart.size, newCart.stock, newCart.quantity);
        if (bool === true) {
            dispatch(clearCart());
            dispatch(addToCart(newCart));
            setShowPay(true);
        };
    };

    const handleChange = (e) => {
        e.preventDefault();
        setNewCart({
            ...newCart,
            quantity: parseInt(e.target.value)
        });
    };

    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w modal-dialog-centered"
                aria-labelledby="example-custom-modal-styling-title"
                className={showPay && 'hidden'}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='modalInformation'>
                        <div className='imgCont'>
                            <img src={image} alt='Not Found' />
                        </div>
                        <div className='bodyCont'>
                            <h2>{name}</h2>
                            <h4>${formatNumber(price)}</h4>
                        </div>
                    </div>
                    <div className='modalInteractive'>
                        <form>
                            <div className='quantityCont'>
                                <span>{t('fastPurchase.size')}</span>
                                <select defaultValue={t('fastPurchase.size')} onChange={e => handleSize(e)}>
                                    <option value="selected" hidden>{t('fastPurchase.size')}</option>
                                    {
                                        size[0] === "único" ? <option name={size[0]} value={0}>{size[0]}</option> : size.map((m, index) => {
                                            return (
                                                (index % 2) === 0 ? <option key={index} name={m} value={index} >{m}</option> : null
                                            )
                                        })
                                    }
                                </select>
                                <div className="condicional">
                                    {
                                        position !== 0 && size[position] !== 0 &&<h4>Stock {size[position]}</h4>
                                    }
                                    {
                                        position !== 0 && size[position] === 0 && <img src={sinStock} alt= "Sin Stock"/>
                                    }
                                </div>
                            </div>
                            <div className='quantityCont2'>
                                <label>{t('fastPurchase.enterQuantity')}</label>
                                <input type="number" min={1} max={size[1]} onChange={e => handleChange(e)} value={newCart.quantity}></input>
                            </div>
                        </form >
                    </div >
                    <div className='buttonModalContainer'>
                        <button onClick={e => handleSubmit(e)}>{t('purchase.payButton')}</button>
                    </div>
                    {
                        showPay && <Buy setShowPay={setShowPay} showPay={showPay} total={newCart.quantity*price} products={cart} user={user} setShow={setShow}/>
                    }
                </Modal.Body >
            </Modal >
        </>
    );
}
