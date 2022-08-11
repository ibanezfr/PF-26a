import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Answer.scss";
import axios from "axios";
import { BASE_URL } from "../../../api_url/api_url";
import { useTranslation } from 'react-i18next';

export default function Answer({
  idQuestion,
  idProduct,
  idClient,
  title,
  description,
  image,
  name,
  answer,
}) {
    const { t } = useTranslation();
    const [answerConst, setAnswerConst] = useState({
        answer: ""
    })

    const [pending, setPending] = useState("Pendiente")

    const [formError, setFormError] = useState(true);

    const [isSubmit, setisSubmit] = useState(true);


    function validString(data) {
        let errors = {}
        if (data.answer.length < 1 || data.answer.length > 255) errors.answer = "La respuesta debe tener más de 1 catácter y menos de 255";
        if (typeof data.answer !== "string") errors.answer = "La información enviada debe ser de tipo string";

        if ((Object.keys(errors).length) === 0) {
            setisSubmit(false)
        };

        return errors;
    }

    const handleChange = (e) => {
        e.preventDefault();

        setFormError(validString(answerConst));
        if ((Object.keys(formError).length) !== 0) {
            setisSubmit(true)
        };
        setAnswerConst({
            [e.target.name]: e.target.value
        })
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${BASE_URL}/admin/answer/` + idQuestion, answerConst);
    console.log("answerConst: ", answerConst);
    setAnswerConst({
      answer: "",
    });
    setPending("Respondida");
  };

  return (
    <div className="qasAllContainer">
      <div className="productInfo">
        <h2>{name}</h2>
        <img className="productImageContainer" src={image} alt="alt text" />
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

                {
                    pending === "Pendiente" ? 
                    <Form className="form">
                    <Form.Group className="mb-3 formGroup" controlId="Question">
                        <Form.Label className="text">{t('answerAdmin.labelAnswer')}</Form.Label>
                        <Form.Control onChange={e => handleChange(e)} name={"answer"} value={answerConst.answer} as="textarea" rows={3} />
                        {
                            formError.answer ? (<h4 className="error"><small>{formError.answer}</small></h4>) : false
                        }
                        <Button disabled={isSubmit} onClick={e => handleSubmit(e)} className="btn" size="sm">
                            {t('answerAdmin.btnAnswer')}
                        </Button>
                    </Form.Group>
                </Form> : null
                }
            </div>
        </div>
    )
}
