import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import { getProductsByName, setSearchStatus } from '../../redux/actions/index.js';
import './Search.scss';



export default function SearchBar() {

    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function inputChangeHandler(event) {
        event.preventDefault();
        setName(event.target.value);
        
    }

    function submitHandler(event) {
        event.preventDefault();
        if (!name) {
            alert("Por favor ingrese un nombre")
        } else {
            dispatch(getProductsByName(name));    
            setRedirect(true);            //original
            dispatch(setSearchStatus(true)) //agregado-agus
            setName("")
        }
    }


    useEffect(() => {
        setRedirect(false);

    }, [name]);
    return (
        <div className="searchContainer">
            {redirect ? <Redirect push to="/search" /> : null}
            <form onSubmit={(element) => submitHandler(element)}>
                <input
                    className="inputSearch"
                    type="text"
                    onChange={inputChangeHandler}
                    onSubmit={submitHandler}
                    value={name}
                    placeholder="🔍 Buscar!"
                />
            </form>
        </div>
    );
}
