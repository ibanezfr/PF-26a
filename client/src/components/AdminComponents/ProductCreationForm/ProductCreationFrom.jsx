import "./ProductCreationForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

export function validate() {

}

export default function ProductCreationForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = useState({
        name: "",
        price: 0,
        description: "",
        color: "|",
        image: "",
        image2: "",
        image3: "",
        image4: "",
        status: "",
        created: true,
        size: "",
    })
    const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {

    }
    const handleSubmit = (e) => {

    }


    return (
        <div></div>
    )
}
