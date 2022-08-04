import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../../redux/actions";
import Answer from "./Answer";
import './Answer.scss'

export default function Answers(){
    const dispatch = useDispatch();
    const qas = useSelector((state)=> state.questionToAnswer)
    
    useEffect(()=>{
        return dispatch(answerQuestion(false));
    }, [])

    // const prueba = qas.map(m=>m.products)

    // console.log("prueba: ", prueba)
    // const mappedProductName = qas.map(m=>m.product)
    // console.log("qas.product[0].name", mappedProductName)
    return(
        <div className="qasContainer">
            <h1>Preguntas y respuestas</h1>
            {
                qas.length?qas.map((question)=>{
                    return <Answer
                    idQuestion={question.id}
                    idProduct={question.products.map(m=>m.name)}
                    title={question.title}
                    description={question.description}
                    image={question.products.map(m=>m.image)}
                    name={question.products.map(m=>m.name)}
                    answer={question.answer}
                    />
                }) : <div><h2>No hay preguntas para responder</h2></div>
            }
            {/* <Answer /> */}
        </div>
    )
}