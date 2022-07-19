import "./ProductCard.scss"


export default function ProductCard({ name, price,description, image }) {
    return (
        <div className="card">
  
  <img className="imagenOne" src={`${image}`} alt={`${name}`} width={"200px"} height={"250px"} />
         <div>

            <span>{name} </span>
            <span>{price} </span>
            <span>{description} </span>
         </div>
      
            
            



        </div>)
}