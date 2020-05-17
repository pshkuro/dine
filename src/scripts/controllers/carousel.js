import CarouselComponent from "../components/carousel";
import {render, RenderPosition} from "../utils/render";

export default class CarouselController {
  constructor(container) {
    this._container = container;
    this._carouselComponent = null;
  }

  render() {
    this._carouselComponent = new CarouselComponent();
    render(this._container, this._carouselComponent, RenderPosition.BEFOREEND);
    this._carouselComponent.setCarouselClickHandler();
  }
}