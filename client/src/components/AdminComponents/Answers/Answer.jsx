import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Answer({
    idQuestion,
    idProduct,
    idClient,
    title,
    description,
    image,
    name,
    price,
    answer
}) {

    return (
        <div>
            {/* <div className="productInfo">
                <h2>{name}</h2>
                <img src={image} />
                <h4>{price}</h4>
            </div>
            <div className="question">
                <h2>{title}</h2>
                <h4>{description}</h4>
            </div>
            <div>
                <Form className="form">
                    <Form.Group className="mb-3 formGroup" controlId="Question">
                        <Form.Label className="text">Pregunta</Form.Label>
                        <Form.Control onChange={e => handleChange(e)} name="answer" value={answer} as="textarea" rows={3} />
                        <Button onClick={e => handleSubmit(e)} className="btn" size="sm">
                            Hacer pregunta
                        </Button>
                    </Form.Group>
                </Form>
            </div> */}
        </div>
    )
}