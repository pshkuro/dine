import CarouselController from './controllers/carousel';
import '../styles/index.scss';

const carouselContainer = document.querySelector('.section-4');
const carouselController = new CarouselController(carouselContainer);
carouselController.render();