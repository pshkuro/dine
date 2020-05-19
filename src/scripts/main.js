import CarouselController from './controllers/carousel';
import ReservationFormController from './controllers/reservation-form';
import '../styles/index.scss';

const carouselContainer = document.querySelector('.section-4');


// Render MainPage CarouselComponent
if (carouselContainer) {
  const carouselController = new CarouselController(carouselContainer);
  carouselController.render();
}

// Render ReservationPage FormComponent
const reservaionFormController = new ReservationFormController();
