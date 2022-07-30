import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function QuestionForm(){
    return(
        <div className="formDiv">
        <Form className="form">
          <Form.Group className="mb-3 formGroup" controlId="Question">
            <Form.Label className="text">Pregunta</Form.Label>
            <Form.Control as="textarea" rows={3} />
            <Button className="btn" size="sm">
              Hacer pregunta
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
}