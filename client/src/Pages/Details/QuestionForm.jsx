import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { QandA } from "../../redux/actions";

export default function QuestionForm(){
    const dispatch = useDispatch();
    const params = useParams();
    const [question, setQuestion] = useState({
        title: "",
        description: ""
    })

    const handleChange= (e)=>{
        e.preventDefault();
        setQuestion({
            ...question,
            [e.target.name] : e.target.value
        })

         console.log("e.target.value", e.target.value)

    }
    
    console.log("question before", question)

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(QandA(params.id, question))
        setQuestion({
          title: "",
          description: ""
      })
    }
    
    console.log("question after", question)

    return(
        <div className="formDiv">
        <Form className="form">
          <Form.Group className="mb-3 formGroup" controlId="Question">
          <Form.Label className="text">Título</Form.Label>
            <Form.Control onChange={e=>handleChange(e)} name="title" value={question.title} as="textarea" rows={3} />
            <Form.Label className="text">Pregunta</Form.Label>
            <Form.Control onChange={e=>handleChange(e)} name="description" value={question.description} as="textarea" rows={3} />
            <Button onClick={e=>handleSubmit(e)} className="btn" size="sm">
              Hacer pregunta
            </Button>
          </Form.Group>
        </Form>

        <div className="questionAsked">

        </div>
      </div>
    )
}