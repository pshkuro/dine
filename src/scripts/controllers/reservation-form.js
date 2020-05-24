import ValidationError from "../classes/validation-error";
import validator from "validator";
import {shake, showElement} from "../utils/common";

const PEOPLE_MIN_COUNT = 1;

const ValidationErrors = {
  EMPTY: new ValidationError('The field is required', 'empty'),
  EMAIL: new ValidationError('The field is not email type', 'email'),
  NUMERIC: new ValidationError('The field must be numeric', 'numeric'),
};


export default class ReservationFormController {
  constructor(api) {
    this._api = api;
    this._reservationForm = document.querySelector('.reservation-form');

    this._requiredFormFields = this._reservationForm.querySelectorAll('input');
    this._peopleCountElement = this._reservationForm.querySelector('.people-count');
    this._select = this._reservationForm.querySelector('#meridien');
    this._selectList = this._select.querySelector('.select__list');
    this._selectHeader = this._select.querySelector('.select__head');
    this._peopleCount = this._peopleCountElement.innerHTML;
    this._successMessage = this._reservationForm.querySelector('.reservation__success-message');

    this._addListeners();
  }

  _addListeners() {
    this._setPeopleCountMinusClickHandler();
    this._setPeopleCountPlusClickHandler();
    this._setSendReservationFormHandler();
    this._openSelectOptionsHandler();
    this._chooseSelectOptionHandler();
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
      this._resetInvalidStyle();
      this._setOpenSelectStyle();
      this._validate();

      const isInvalid = this._reservationForm.classList.contains('invalid');
      const reservationInfo = this._gatherFormInfo();
      if (!reservationInfo || isInvalid) {
        shake(this._reservationForm);
        return;
      } else {
        this._sendReservationInfo(reservationInfo);
      }
    });
  }

  // Select work
  _openSelectOptionsHandler(){
    this._selectHeader.addEventListener('click', () => {
      if (this._select.classList.contains('select__open')) {
        this._setCloseSelectStyle();
      } else {
        this._setOpenSelectStyle();
      }
    });
  }

  _chooseSelectOptionHandler() {
      this._selectList.addEventListener('click', (evt) => {
      const selectListElement = evt.target.closest('li');
      const checkedElement = this._selectList.querySelector('.checked');
      const selectHeadContent = this._selectHeader.querySelector('.select__head__content');

      if (selectListElement && checkedElement) {
          checkedElement.classList.remove('checked');
          selectListElement.classList.add('checked');
          selectHeadContent.innerHTML = selectListElement.innerHTML;
      }
    });
  }

  // Validation
  _setInvalidStyle(element, errorMessage, errorClass) {
    const errorMessageParent = element.closest('.error-message__parent');
    element.classList.add('unvalid');

    if (!errorMessageParent.classList.contains(errorClass)) {
      errorMessageParent.insertAdjacentHTML('afterend', '<p class="error-message">' + errorMessage + '</p>');
      errorMessageParent.classList.add(errorClass);
      this._reservationForm.classList.add('invalid');
    }

  }

  _resetInvalidStyle() {
    const errorMessageElements = this._reservationForm.querySelectorAll('.error-message');
    const errorMessageParent = this._reservationForm.querySelectorAll('.error-message__parent');

    this._requiredFormFields.forEach((field) => field.classList.remove('unvalid'));
    errorMessageParent.forEach((parent) => parent.classList.remove(ValidationErrors.EMPTY.className,
       ValidationErrors.EMAIL.className, ValidationErrors.NUMERIC.className));
    errorMessageElements.forEach((message) => message.remove());

    this._reservationForm.classList.contains('invalid') ? this._reservationForm.classList.remove('invalid') : '';
  }

  _validate() {
    const emailFormField = this._reservationForm.querySelector('input[type="email"]');
    const numberFormField = Array.from(this._reservationForm.querySelectorAll('.number__field'));
  

    // Check is some empty field
    this._requiredFormFields.forEach((field) => {
      if (validator.isEmpty(field.value)) {
        this._setInvalidStyle(field, ValidationErrors.EMPTY.label, ValidationErrors.EMPTY.className);
      }
    });

    // Check is email right format
    const isEmailFieldRightFormat = validator.isEmail(emailFormField.value);
    if (!isEmailFieldRightFormat) {
      this._setInvalidStyle(emailFormField, ValidationErrors.EMAIL.label, ValidationErrors.EMAIL.className);
    }

    // Check are data fileds numeric
    const isNumberFieldRightFormat = numberFormField.filter((field) => !validator.isNumeric(field.value))
      .forEach((field) => this._setInvalidStyle(field, ValidationErrors.NUMERIC.label, ValidationErrors.NUMERIC.className));
  
  }

  // For send form info
  _gatherFormInfo() {
    const name = this._reservationForm.querySelector('#name').value;
    const email = this._reservationForm.querySelector('#email').value;
    const month = this._reservationForm.querySelector('#month').value;
    const day = this._reservationForm.querySelector('#day').value;
    const year = this._reservationForm.querySelector('#year').value;
    const hour = this._reservationForm.querySelector('#hour').value;
    const hours = null;
    const minutes = this._reservationForm.querySelector('#minutes').value;
    const meredian = this._reservationForm.querySelector('.select__head__content').innerHTML;
    const peopleCount = this._reservationForm.querySelector('.people-count').innerHTML;

    if (meredian === 'PM') {
      hours === hour + 12;
    }

    const visitDate = new Date();
    visitDate.setFullYear(year, month, day);
    visitDate.setHours(hours, minutes);

    return {
      name,
      email,
      visitDate,
      peopleCount,
    };
  }
  
  // Send reservation info on server
  _sendReservationInfo(info) {
    this._api.sendFormInfo(info)
    .then(() => {
      this._reservationForm.reset();
      showElement(this._successMessage);
    })
    .catch(() => {
      shake(this._reservationForm);
    });
  }

  _setCloseSelectStyle() {
    this._select.classList.remove('select__open');
    this._selectList.style.display = `block`;
  }

  _setOpenSelectStyle() {
    this._select.classList.add('select__open');
    this._selectList.style.display = `none`;
  }
}