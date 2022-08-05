import {React,useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {fetchCategory} from "../../redux/actions/index.js"
import {Link} from "react-router-dom"
import CardCategory from "./CardCategory.jsx";

export default function AllCategories(){
    const dispatch = useDispatch();
    const allCategories = useSelector((state)=>state.category) 
    console.log("hola",allCategories)
    useEffect(() =>{
        dispatch(fetchCategory())
    },[])
   
    return(
        <div>
         <h3>Mis categorias</h3>

         <Link to={"/admin/categoria/nueva"}>
                        Crear categoria
         </Link>
         <div className="cardCategires">
            
          {
            allCategories?.map((cat) =>{
                return(
                    <section>
                       
                        <CardCategory
                        name={cat.name}
                        idCat={cat.id}
                        />
                      
                    
                    </section>
                )
            })
          }
        </div>
        </div>
    )
}