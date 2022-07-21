import React from "react";

import Carousel from 'react-bootstrap/Carousel';

function Carrousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://sonaesierracms-v2.cdnpservers.net/wp-content/uploads/sites/28/2020/04/ropa-deportiva-casa.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Los mejores conjuntos</h3>
          <p>Encontralos en nuestra tienda online o en el local de lunes a viernes de 8am a 6pm</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.comunicarseweb.com/sites/default/files/styles/galeria_noticias/public/pages/m-18-first-mile3.jpg?itok=6zCj7C3_"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>La mejor calidad de ropa</h3>
          <p>Seleccionamos cuidadosamente nuestros productos para ofrecerte lo mejor</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://prochampions.vteximg.com.br/arquivos/Sale-jun-m.jpg?v=637911595806570000"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>¿Te lo vas a perder?</h3>
          <p>
            Te esperamos esta semana para disfrutar de los mejores descuentos
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrousel;