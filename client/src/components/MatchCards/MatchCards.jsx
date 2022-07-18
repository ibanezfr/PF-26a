import { useSelector } from "react-redux";
import MatchCard from "../MatchCard/MatchChard";


export default function MatchCards(){
    let allMatches = useSelector((state)=> state.partido)
    console.log(allMatches)

    return(
        <div>
            <div>
                {
                    allMatches?.map(m=>{
                        return <MatchCard
                        key={m.id}
                        home={m.home}
                        guest={m.guest}
                        image_guest={m.image_guest}
                        image_home={m.image_home}
                        date={m.date}
                        statistics={m.statistics}
                        />
                    })
                }
            </div>
        </div>
    )
}