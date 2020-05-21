import CarouselController from './controllers/carousel';
import ReservationFormController from './controllers/reservation-form';
import '../styles/index.scss';

const carouselContainer = document.querySelector('.section-4');
const reservationFormContainer = document.querySelector('.reservation-page__container');


// Render MainPage CarouselComponent
if (carouselContainer) {
  const carouselController = new CarouselController(carouselContainer);
  carouselController.render();
}

// Render ReservationPage FormComponent
if (reservationFormContainer) {
  const reservaionFormController = new ReservationFormController();
}