import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../../redux/actions";
import Answer from "./Answer";
import './Answer.scss'
import { useTranslation } from 'react-i18next';
import question from '../../../images/question.png'

export default function Answers() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const qas = useSelector((state) => state.questionToAnswer)

    useEffect(() => {
        return dispatch(answerQuestion(false));
    }, [])

    // const prueba = qas.map(m=>m.products)

    // console.log("prueba: ", prueba)
    // const mappedProductName = qas.map(m=>m.product)
    // console.log("qas.product[0].name", mappedProductName)
    return (
        <div className="qasContainer">
            <h1>{t('answersAdmin.h1')}</h1>
            {
                qas.length ? qas.map((question) => {
                    return <Answer
                        idQuestion={question.id}
                        idProduct={question.products.map(m => m.name)}
                        title={question.title}
                        description={question.description}
                        image={question.products.map(m => m.image)}
                        name={question.products.map(m => m.name)}
                        answer={question.answer}
                    />
                }) : 
                <div className="noQuestion">
                    <h2>{t('answersAdmin.h2')}</h2>
                    <img src={question} alt='none' />
                </div>
            }
            {/* <Answer /> */}
        </div>
    )
}
