import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bringSize, clearCart, addToCart } from '../../redux/actions';
//import { browserHistory } from 'react-router';
import Swal from 'sweetalert2'
import { cartController, formatNumber } from '../../Utils';

export default function FastPurchase({ setShow, show, image, name, price, id }) {

    const dispatch = useDispatch();
    let size = useSelector(state => state.size)
    let history = useHistory();

    useEffect(() => {
        // dispatch(getProductsById(id)) igual funciona y evita la carga del estado
        if(show) {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        var bool = cartController(Swal, newCart.size, newCart.stock, newCart.quantity);
        if (bool === true) {
            dispatch(clearCart());
            dispatch(addToCart(newCart));
            history.push('/purchase');
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
                        <h4>${formatNumber(price)}</h4>
                    </div>
                    <div>
                        <span>Selecciona un talle</span>
                        <form>
                            <select defaultValue="Seleccioná un talle" onChange={e => handleSize(e)}>
                                <option disabled>Seleccioná un talle</option>
                                {
                                    size[0] === "único" ? <option name={size[0]} value={0}>{size[0]}</option> : size.map((m, index) => {
                                        return (
                                            (index % 2) === 0 ? <option key={index} name={m} value={index} >{m}</option> : null
                                        )
                                    })
                                }
                            </select>
                            <h4>Stock: {size[1]}</h4>
                            <label>Ingresá la cantidad que buscas</label>
                            <input type="number" min={1} max={size[1]} onChange={e => handleChange(e)} value={newCart.quantity}></input>
                        </form>
                    </div>
                    <div>
                        <button onClick={e => handleSubmit(e)}>Continuar compra</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
