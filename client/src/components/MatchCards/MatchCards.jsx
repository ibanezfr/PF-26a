import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MatchCard from "../MatchCard/MatchChard";
import { fetchMatches } from "../../redux/actions";


export default function MatchCards(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchMatches())
    }, [dispatch])

    let allMatches = useSelector((state)=> state.matches)
    // console.log(allMatches)

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