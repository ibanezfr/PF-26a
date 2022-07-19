import "./ProductCard.scss"


export default function ProductCard({ name, price, description, image, image2, image3, image4 }) {
    return (
        <div className="card">

        <img src={image} alt="not found"/>
        <img src={image2} alt="not found"/>
        <img src={image3} alt="not found"/>
        <img src={image4} alt="not found"/>
        
  {/* <img className="imagenOne" src={`${image}`} alt={`${name}`} width={"200px"} height={"250px"} /> */}
  {/* <img src={loadImage("image")} alt="img" /> */}
         <div>

            <h2>{name} </h2>
            <h3>{price} </h3>
            <h4>{description} </h4>
         </div>
      
            
            



        </div>)
}