import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bringAnswers, bringQandA, getProductsById, getQandA} from "../../redux/actions";

export default function QuestionForm() {
  const dispatch = useDispatch();
  const params = useParams();
  const [question, setQuestion] = useState({
    title: "",
    description: ""
  })

  let actualProduct = useSelector(state => state.detail)
  let QandA = useSelector(state => state.infoQuestion)
  let answers = useSelector(state => state.infoAnswer);

  const qState = QandA;


  useEffect(() => {
    dispatch(getProductsById(params.id))
    dispatch(bringQandA(params.id))
    dispatch(bringAnswers(params.id))
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setQuestion({
      ...question,
      [e.target.name]: e.target.value
    })
    // console.log("e.target.value", e.target.value)

  }

  console.log("question before", question)

  function mapState (){
    var mappedTitle = question.title;
    var mappedDescription = question.description;
    console.log("maped", mappedTitle, mappedDescription)
    qState.push(mappedTitle)
    qState.push(mappedDescription)
    
    console.log("estado de prueba", qState)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getQandA(params.id, question))
    setQuestion({
      title: "",
      description: ""
    })
    dispatch(mapState)
  }

  console.log("question after", question)

  return (
    <div className="formDiv">
      <Form className="form">
        <Form.Group className="mb-3 formGroup" controlId="Question">
          <Form.Label className="text">Título</Form.Label>
          <Form.Control onChange={e => handleChange(e)} name="title" value={question.title} as="textarea" rows={3} />
          <Form.Label className="text">Pregunta</Form.Label>
          <Form.Control onChange={e => handleChange(e)} name="description" value={question.description} as="textarea" rows={3} />
          <Button onClick={e => handleSubmit(e)} className="btn" size="sm">
            Hacer pregunta
          </Button>
        </Form.Group>
      </Form>

      <div>
        <div className="questions">
          <h2 className="titleQuestion">También preguntaron:</h2>
          {
            QandA ? QandA.map((m, index) => {
              return (
                (index % 2) === 0 ? <div className="QandAContainer"><div className="question bubble"><h2>{m}</h2><p>{QandA[index + 1]}</p></div>
                  <div className="answer"><p>{answers[index]}</p></div> </div> : null
              )
            }) : <div className="questionNull">No hay preguntas</div>
          }
        </div>
      </div>
    </div>
  )
}