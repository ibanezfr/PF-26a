import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Answer.scss'
import axios from "axios";

export default function Answer({
    idQuestion,
    idProduct,
    idClient,
    title,
    description,
    image,
    name,
    answer
}) {

    const [answerConst, setAnswerConst] = useState({
        answer: ""
    })

    const [pending, setPending] = useState("Pendiente")

    const handleChange = (e) => {
        e.preventDefault();
        setAnswerConst({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put("http://localhost:3001/admin/answer/" + idQuestion, answerConst)
        console.log("answerConst: ", answerConst)
        setAnswerConst({
            answer: ""
        })
        setPending("Respondida")
    }

    return (
        <div className="qasAllContainer">
                <div className="productInfo">
                    <h2>{name}</h2>
                    <img className="productImageContainer" src={image} />
                </div>
                <div className="question">
                    <div className="questionInfo">
                    <h2>{title}</h2>
                    <h4>{description}</h4>
                    {
                        pending === "Pendiente" ? <div className="pending"><span>{pending}</span></div> :
                        <div className="done">{pending}</div>
                    }
                    {/* <span>{pending}</span> */}
                    </div>

                    <Form className="form">
                        <Form.Group className="mb-3 formGroup" controlId="Question">
                            <Form.Label className="text">Respuesta</Form.Label>
                            <Form.Control onChange={e => handleChange(e)} name={"answer"} value={answerConst.answer} as="textarea" rows={3} />
                            <Button onClick={e => handleSubmit(e)} className="btn" size="sm">
                                Responder
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
        </div>
    )
}