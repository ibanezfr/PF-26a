import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import { getProductsByName } from '../../redux/actions/index.js';



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
        dispatch(getProductsByName(name));        
        setRedirect(true);
        setName("")
    }




    useEffect(() => {
        setRedirect(false);

    }, [name]);
    return (
        <div className="">
            {redirect ? <Redirect push to="/search" /> : null}
            <form onSubmit={(element) => submitHandler(element)}>
                <input
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