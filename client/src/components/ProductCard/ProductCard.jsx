import "./ProductCard.scss"


export default function ProductCard({ name, price, description, image, image2, image3, image4 }) {
    return (
        <div className="card">

        <img src={image} alt="not found"/>
        {
          image2 !== "null" ? <img src={image2}
        }
  {/* <img className="imagenOne" src={`${image}`} alt={`${name}`} width={"200px"} height={"250px"} /> */}
  {/* <img src={loadImage("image")} alt="img" /> */}
         <div>

            <h2>{name} </h2>
            <h3>{price} </h3>
            <h4>{description} </h4>
         </div>
      
            
            



        </div>)
}