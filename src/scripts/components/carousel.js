import AbstractComponent from "./abstract-component";
import {activateElement} from "../utils/common";
import {CaruoselItemContent, CarouselItemType} from "../const";


export default class CarouselComponent extends AbstractComponent {
  constructor() {
    super();

    this._imageAddress= null;
    this._eventTitle = null;
    this._eventDescription = null;
  }


  getTemplate() {
    const currentContent = CaruoselItemContent[CarouselItemType.FAMILY];
    this._imageAddress = currentContent.image_address;
    this._eventTitle = currentContent.title;
    this._eventDescription = currentContent.description;
  
    return (`<div class="container section-4__container">
    <div class="section-4__container__row__photo">
      <picture class="img img__family carousel__img">
        ${this._getImageMarkups(this._imageAddress)}
      </picture>
    </div>
    <div class="section-4__container__row__content">
      <div class="row__content__description">
        <h2 class="font-head_m carousel__title">${this._eventTitle}</h2>
        <p class="font-body_m row__content__description__font-body_m carousel__description">${this._eventDescription}</p>
        <form action="reservation.html">
          <button class="button section-4__button button_theme_light">BOOK A TABLE</button>
        </form>
      </div>
      <div class="row__content__slider color-braun">
        <p class="font-head_xs active" id="carousel__family"><span class="carousel__item">FAMILY GATHERING</span></p>
        <p class="font-head_xs" id="carousel__special"><span class="carousel__item">SPECIAL EVENTS</span></p>
        <p class="font-head_xs" id="carousel__social"><span class="carousel__item">SOCIAL EVENTS</span> </p>
      </div>
    </div>
  </div>`);
  }

  setCarouselClickHandler() {
    const carouselContainer = this._element.querySelector('.row__content__slider');
    carouselContainer.addEventListener('click', (evt) => {
    
      const carouselItem = evt.target.closest('.carousel__item');
      if (carouselItem) {
        const carouselItemName = this._getCarouselTypeNameById(evt.target.parentElement.id);
        this._nextItem(carouselItemName);
        activateElement(evt.target.parentElement, this.getElement(), `active`);
      }
    });
  }

  _getCarouselTypeNameById(id) {
    const CAROUSEL_TYPE_ID_PREFIX = `carousel__`;
    return id.substring(CAROUSEL_TYPE_ID_PREFIX.length);
  }

  // Replace old content width new, depending on carousel item type
  _nextItem(itemType) {
    const carouselImage = this._element.querySelector('.carousel__img');
    const carouselTitle = this._element.querySelector('.carousel__title');
    const carouselDescription = this._element.querySelector('.carousel__description');
    
    carouselImage.innerHTML = this._getImageMarkups(CaruoselItemContent[itemType].image_address);
    carouselTitle.innerHTML = CaruoselItemContent[itemType].title;
    carouselDescription.innerHTML = CaruoselItemContent[itemType].description;
  }

  _getImageMarkups(imageUrl) {
    return (`
      <source media="(max-width: 767px)" srcset="${imageUrl}-mobile.jpg">
      <source media="(max-width: 1440px)" srcset="${imageUrl}-tablet.jpg">
      <img src="${imageUrl}-desktop.jpg" alt="" class="img img__family carousel__img">
    `);
  }

}