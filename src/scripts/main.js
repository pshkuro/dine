import API from "./api/reservation";
import CarouselController from './controllers/carousel';
import ReservationFormController from './controllers/reservation-form';
import Scollable from "./scrolable/scrolable";
import '../styles/index.scss';

const AUTHORIZATION = `Basic kTy9gIdsz2217rD`;
const END_POINT = '';

const carouselContainer = document.querySelector('.section-4');
const reservationFormContainer = document.querySelector('.reservation-page__container');
const api = new API(END_POINT, AUTHORIZATION);


// Render MainPage CarouselComponent
if (carouselContainer) {
  const carouselController = new CarouselController(carouselContainer);
  carouselController.render();
}

// Render ReservationPage FormComponent
if (reservationFormContainer) {
  new ReservationFormController(api);
  new Scollable();
}