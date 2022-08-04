import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bringSize, clearCart, addToCart } from '../../redux/actions';
import Swal from 'sweetalert2'
import './FastPurchase.scss'
//import { browserHistory } from 'react-router';

export default function FastPurchase({ setShow, show, image, name, price, id }) {

    const dispatch = useDispatch();

    let size = useSelector(state => state.size)
    const [position, setPosition] = useState(0);

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
        setPosition(parseInt(e.target.value) + 1);
        setNewCart({
            id: id,
            name: name,
            img: image,
            size: size[e.target.value],
            price: price,
            stock: size[position],
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
                </Modal.Header>
                <Modal.Body>
                    <div className='modalInformation'>
                        <div className='imgCont'>
                            <img src={image} alt='Not Found' />
                        </div>
                        <div className='bodyCont'>
                            <h2>{name}</h2>
                            <h4>${price}</h4>
                        </div>
                    </div>
                    <div className='modalInteractive'>
                        <form>
                            <div className='quantityCont'>
                                <span>Selecciona un talle</span>
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
                                {
                                    position !== 0 && <h4>Stock: {size[position]}</h4>
                                }
                            </div>
                            <div className='quantityCont'>
                                <label>Ingresá la cantidad que buscas</label>
                                <input type="number" min={1} max={size[1]} onChange={e => handleChange(e)} value={newCart.quantity}></input>
                            </div>
                        </form>
                    </div>
                    <div className='buttonModalContainer'>
                        <button onClick={e => handleSubmit(e)}>Continuar compra</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
