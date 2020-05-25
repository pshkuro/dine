export default class Scollable {
  constructor() {
    this._scrollableElements = document.querySelectorAll('[data-scrollable]');
    this._showScollableElement();
  }
  
  _showScollableElement() {
    this._scrollableElements.forEach((element) => {
      this._setScrollableButtonClickHandler(element);
    });
  }

  _setScrollableButtonClickHandler(element) {
    element.addEventListener('click', () => {
      const showedElement = document.querySelector(element.dataset.scrollable);
      showedElement.scrollIntoView({behavior: "smooth"});
    });
  }


}
