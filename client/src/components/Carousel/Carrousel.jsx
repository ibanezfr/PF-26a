import React from "react";
import Carousel from 'react-bootstrap/Carousel';
// import '../../Bootstrap/custom.scss';
import banner from '../../images/banner.png'
import banner2 from '../../images/banner2.png'
import banner3 from '../../images/banner3.png'
import './Carrousel.scss';
import { useTranslation } from 'react-i18next';

function Carrousel() {
  const { t } = useTranslation();
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
            <h3 className="carrouselText">{t('carrousel.bestoutfits')}</h3>
            <p className="carrouselText">{t('carrousel.bestdescription')}</p>
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
            <h3 className="carrouselText">{t('carrousel.bestquality')}</h3>
            <p className="carrouselText">{t('carrousel.bestOffer')}</p>
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
            <h3 className="carrouselText">{t('carrousel.missIt')}</h3>
            <p className="carrouselText">
              {t('carrousel.waiting')}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>

  );
}

export default Carrousel;
