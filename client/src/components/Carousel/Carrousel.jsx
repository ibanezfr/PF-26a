import React from "react";
import Carousel from 'react-bootstrap/Carousel';
// import '../../Bootstrap/custom.scss';
import banner from '../../images/banner.png'
import banner2 from '../../images/banner2.png'
import banner3 from '../../images/banner3.png'
import './Carrousel.scss'

function Carrousel() {
  return (
    <div className="carrouselContainer">    
      <Carousel className="carrousel">
      <Carousel.Item className="carrouselItem">
        <img
          className="carrouselImage d-block w-100"
          src={banner}
          alt="First slide"
          width='80%'
          height='7%'
          object-fit='cover'
        />
        <Carousel.Caption>
          <h3>Los mejores conjuntos</h3>
          <p>Encontralos en nuestra tienda online o en el local de lunes a viernes de 8am a 6pm</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carrouselItem">
        <img
          className="d-block w-100"
          src={banner2}
          alt="Second slide"
          width='80%'
          height='7%'
          object-fit='cover'
        />

        <Carousel.Caption>
          <h3>La mejor calidad de ropa</h3>
          <p>Seleccionamos cuidadosamente nuestros productos para ofrecerte lo mejor</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carrouselItem">
        <img
          className="d-block w-100"
          src={banner3}
          alt="Third slide"
          width='80%'
          height='7%'
          object-fit='cover'
        />

        <Carousel.Caption>
          <h3>¿Te lo vas a perder?</h3>
          <p>
            Te esperamos esta semana para disfrutar de los mejores descuentos
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
    </div>

  );
}

export default Carrousel;