import validator from "validator";

const PEOPLE_MIN_COUNT = 1;

const ValidationError = {
  EMPTY: 'The field is required',
  EMAIL: 'The field is not email type',
  NUMERIC: 'The field must be numeric',
};

export default class ReservationFormController {
  constructor() {
    this._reservationForm = document.querySelector('.reservation-form');

    this._requiredFormFields = this._reservationForm.querySelectorAll('input');
    this._peopleCountElement = this._reservationForm.querySelector('.pople-count');
    this._peopleCount = this._peopleCountElement.innerHTML;

    this._addListeners();
  }

  _addListeners() {
    this._setPeopleCountMinusClickHandler();
    this._setPeopleCountPlusClickHandler();
    this._setSendReservationFormHandler();
    this._checkReservationFormFieldState();
  }

  // People count work
  _setPeopleCountMinusClickHandler() {
    const minusButton = this._reservationForm.querySelector('.button__people-count__minus');

    minusButton.addEventListener('click', (evt) => {
      if (this._peopleCount > PEOPLE_MIN_COUNT) {
        this._peopleCountElement.innerHTML = --this._peopleCount;
      }
    });
  }

  _setPeopleCountPlusClickHandler() {
    const plusButton = this._reservationForm.querySelector('.button__people-count__plus');

    plusButton.addEventListener('click', () => {
      this._peopleCountElement.innerHTML = ++this._peopleCount;
    });
  }

  // Send reservation form info
  _setSendReservationFormHandler() {
    const sendFormButton = this._reservationForm.querySelector('.button__resarvation-form');

    sendFormButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._validate();
    });
  }

  _checkReservationFormFieldState() {
    this._reservationForm.addEventListener('change', (evt) => {
      const reservationFormField = evt.target.closest('input');

      if (reservationFormField) {
        this._resetInvalidStyle(reservationFormField);
      }
    });
  }

  // Validation
  _setInvalidStyle(element, errorMessage) {
    const errorMessageParent = element.closest('.error-message__parent');
    element.classList.add('unvalid');

    if (errorMessageParent.nextSibling.innerHTML !== errorMessage) {
      errorMessageParent.insertAdjacentHTML('afterend', '<p class="error-message">' + errorMessage + '</p>');
    }

  }

  _resetInvalidStyle(element) {
    element.classList.remove('unvalid');
    element.nextSibling.remove();
  }

  _validate() {
    const emailFormField = this._reservationForm.querySelector('input[type="email"]');
    const numberFormField = this._reservationForm.querySelectorAll('.number__field');

    // Check is some empty field
    this._requiredFormFields.forEach((field) => {
      if (validator.isEmpty(field.value)) {
        this._setInvalidStyle(field, ValidationError.EMPTY);
      }
    });

    // Check is email right format
    const isEmailFieldRightFormat = validator.isEmail(emailFormField.value);
    if (!isEmailFieldRightFormat) {
      this._setInvalidStyle(emailFormField, ValidationError.EMAIL);
    }

    const isNumberFieldRightFormat = numberFormField.forEach((field) => validator.isNumeric(field.value));
  }

  // For send form info
  _gatherFormInfo() {
    const name = this._reservationForm.querySelector('#name').value;
    const email = this._reservationForm.querySelector('#email').value;
    const month = this._reservationForm.querySelector('#month').value;
    const day = this._reservationForm.querySelector('#day').value;
    const year = this._reservationForm.querySelector('#year').value;
    const hour = this._reservationForm.querySelector('#hour').value;
    const minutes = this._reservationForm.querySelector('#minutes').value;
    const meredian = this._reservationForm.querySelector('#meridien').value;
    const peopleCount = this._reservationForm.querySelector('.people-count').innerHTML;

    if (meredian = 'PM') {
      hour+= 12;
    }

    const visitDate = new Date();
    visitDate.setFullYear(year, month, day);
    visitDate.setHours(hour, minutes);

    return {
      name,
      email,
      visitDate,
      peopleCount,
    };
  }
 
}