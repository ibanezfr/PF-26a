import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bringSize, clearCart, addToCart } from '../../redux/actions';
//import { browserHistory } from 'react-router';
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next';

export default function FastPurchase({ setShow, show, image, name, price, id }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let size = useSelector(state => state.size)

    useEffect(() => {
        // dispatch(getProductsById(id)) igual funciona y evita la carga del estado
        dispatch(bringSize(id))
    }, [dispatch]);

    const [newCart, setNewCart] = useState({
        id: "",
        name: "",
        img: "",
        size: "",
        price: "",
        stock: size[1],
        quantity: 0
    });

    // .log("antes del handleChange: ", newCart)

    const handleSize = (e) => {
        e.preventDefault();
        setNewCart({
            id: id,
            name: name,
            img: image,
            size: size[e.target.value],
            price: price,
            stock: size[1],
            quantity: 0
        });
    };

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newCart.size === "" || newCart.quantity === 0) {
            Swal.fire({
                title: 'Seleccioná un talle y una cantidad para continuar',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        } else {
            dispatch(clearCart())
            dispatch(addToCart(newCart));
            history.push('/purchase')
        };

    }

    const handleChange = (e) => {
        e.preventDefault();
        setNewCart({
            ...newCart,
            quantity: parseInt(e.target.value)
        });
    };

    //   console.log("despues del handleChange: ", newCart)

    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Custom Modal Styling
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h2>{name}</h2>
                        <img src={image} width="400px" height="400px" alt='Not Found' />
                        <h4>{price}</h4>
                    </div>
                    <div>
                        <span>{t('fastPurchase.size')}</span>
                        <form>
                            <select defaultValue="Seleccioná un talle" onChange={e => handleSize(e)}>
                                <option disabled>{t('fastPurchase.size')}</option>
                                {
                                    size[0] === "único" ? <option name={size[0]} value={0}>{size[0]}</option> : size.map((m, index) => {
                                        return (
                                            (index % 2) === 0 ? <option key={index} name={m} value={index} >{m}</option> : null
                                        )
                                    })
                                }
                            </select>
                            <h4>{t('fastPurchase.stock')}{size[1]}</h4>
                            <label>{t('fastPurchase.enterQuantity')}</label>
                            <input type="number" min={1} max={size[1]} onChange={e => handleChange(e)} value={newCart.quantity}></input>
                        </form>
                    </div>
                    <div>
                        <button onClick={e => handleSubmit(e)}>{t('fastPurchase.continue')}</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
