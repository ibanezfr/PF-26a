import React from "react";

export default function MatchCard({id, image_home, home, guest, image_guest, statistics, date}){
    const score = statistics.map(s => s.score)
    console.log(score);
    return (
        <div>
            <div>
                <h2>{home}</h2>
                <img src={`${image_home}`} alt={`${home}`}/>
            </div>
            <div>
                <h2>{guest}</h2>
                <img src={`${image_guest}`} alt={`${guest}`}/>
            </div>
            <div>
                <h4>{score[0]} - {score[1]}</h4>
                <h4>{date}</h4>
            </div>

        </div>
    )
}