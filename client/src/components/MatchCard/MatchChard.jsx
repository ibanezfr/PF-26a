import React from "react";
import './MatchCard.css'

export default function MatchCard({id, image_home, home, guest, image_guest, statistics, date}){
    const score = statistics.map(s => s.score)
    console.log(score);
    return (
        <div className="container">
            <div className="titleContainer">
                <h2>{home}</h2>
                <img src={`${image_home}`} alt={`${home}`}/>
                <h2>{guest}</h2>
                <img src={`${image_guest}`} alt={`${guest}`}/>
            </div>
            <div className="infoContainer">
                <h4>{score[0]} - {score[1]}</h4>
                <h4>{date}</h4>
            </div>

        </div>
    )
}