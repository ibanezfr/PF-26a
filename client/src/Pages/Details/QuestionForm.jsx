import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bringAnswers, bringQandA, getProductsById, getQandA } from "../../redux/actions";
import Swal from 'sweetalert2'
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';
import './QandA.scss'
import gifEnvio from "../../images/giftEnvio.gif";

export default function QuestionForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const [question, setQuestion] = useState({
    title: "",
    description: ""
  })

  // let actualProduct = useSelector(state => state.detail)
  let QandA = useSelector(state => state.infoQuestion)
  let answers = useSelector(state => state.infoAnswer);
  const history = useHistory();
  const { user } = useAuth();

  const qState = QandA;

  useEffect(() => {
    dispatch(getProductsById(params.id))
    dispatch(bringQandA(params.id))
    dispatch(bringAnswers(params.id))
  }, [dispatch, params.id]);


  const [formError, setFormError] = useState(true);

  const [isSubmit, setisSubmit] = useState(true);

  // console.log("question before", question)
  function validString(data) {
    let errors = {}
    if (data.title.length < 1 || data.title.length > 255) errors.title = "El título debe tener más de 1 catácter y menos de 255";
    if (typeof data.title !== "string") errors.title = "La información enviada debe ser de tipo string";
    if (data.description.length < 1 || data.description.length > 255) errors.description = "La descripción debe tener más de 1 catácter y menos de 255";
    if (typeof data.description !== "string") errors.description = "La información enviada debe ser de tipo string";

    if ((Object.keys(errors).length) === 0) {
      setisSubmit(false)
    };

    return errors;
  }
  const handleChange = (e) => {
    e.preventDefault();
    setFormError(validString(question));
    if ((Object.keys(formError).length) !== 0) {
      setisSubmit(true)
    };
    setQuestion({
      ...question,
      [e.target.name]: e.target.value
    })
    // console.log("e.target.value", e.target.value)

  }

  function mapState() {
    var mappedTitle = question.title;
    var mappedDescription = question.description;
    // console.log("maped", mappedTitle, mappedDescription)
    qState.push(mappedTitle)
    qState.push(mappedDescription)

    // console.log("estado de prueba", qState)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    user ? dispatch(getQandA(params.id, question)) : Swal.fire({
      title: t('questionForm.title'),
      text: t('questionForm.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: t('questionForm.cancelButtonText'),
      confirmButtonText: t('questionForm.confirmButtonText')
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/login")
      }
    })
    setQuestion({
      title: "",
      description: ""
    })
    dispatch(mapState);
    Swal.fire({
      position: 'center',
      title: 'Envio exitoso',
      text: "Pronto estaremos respondiendo",
      imageUrl: gifEnvio,
      imageWidth: 200,
      imageHeight: 100,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      timer: 2000
    })
  }

  // console.log("question after", question)

  return (
    <div className="formDiv scroll-container">
      <h2>¿Tenés alguna consulta? Escribinos:</h2>
      <Form className="form">
        <Form.Group className="mb-3 formGroup" controlId="Question">
          <Form.Label className="text">{t('questionForm.title')}</Form.Label>
          <Form.Control onChange={e => handleChange(e)} name="title" value={question.title} as="textarea" rows={3} />
          {
            formError.title ? (<h4 className="error"><small>{formError.title}</small></h4>) : false
          }
          <Form.Label className="text">{t('questionForm.question')}</Form.Label>
          <Form.Control onChange={e => handleChange(e)} name="description" value={question.description} as="textarea" rows={3} />
          {
            formError.description ? (<h4 className="error"><small>{formError.description}</small></h4>) : false
          }
          <Button disabled={isSubmit} onClick={e => handleSubmit(e)} className="btn" size="sm">
            {t('questionForm.makeQuestion')}
          </Button>
        </Form.Group>
      </Form>

      <div className="questions">
        <h2 className="titleQuestion">{t('questionForm.alsoAsked')}</h2>
        {
          QandA 
            ? 
              QandA.map((m, index) => {
                return (
                  (index % 2) === 0 
                    ?
                      <div className="QandAContainer" key={index}>
                        <div className="question bubble">
                          <h2>{m}</h2>
                          <p>{QandA[index + 1]}</p>
                        </div>
                        <div className="answer">
                          {
                            answers[index] && <p>{answers[index]}</p>
                          }
                        </div>
                      </div> 
                    : null
                )
              })
            : 
              <div className="questionNull">{t('questionForm.noQuestion')}</div>
        }
      </div>
    </div>
  )
};
