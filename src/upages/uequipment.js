import './lppto.css';
import './uequipment.css';

import { renderLoading } from '../js/utils/utils.js';

import FormValidator from '../js/components/FormValidator';
import Api from '../js/components/Api.js';
import FormStatic from '../js/components/FormStatic.js';


const formApi = new Api({
  baseUrl: 'https://functions.yandexcloud.net/d4ev2u6l42j1lf5m5uof',
  headers: {
    'Accept': 'application/json',
    //'Content-Type': 'text/plain'
    'Content-Type': 'application/json;charset=utf-8',
  },
});

//    Форма--Расчёта--Статика     //
const staticRaschetFormConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

const staticRaschetForm = document.forms.formRaschetStatic;
const staticRaschetSubmitButton = staticRaschetForm.querySelector(staticRaschetFormConfig.submitButtonSelector);
const staticRaschetFormValidator = new FormValidator(staticRaschetFormConfig, staticRaschetForm);
staticRaschetFormValidator.enableValidation();

const staticRaschetFormEl = new FormStatic({
  formSubmitHandler: (callBackData) => {
    renderLoading(true, staticRaschetSubmitButton, 'Оставить заявку', 'Отправляем в Ютермо...');

    formApi.sendBigForm(callBackData)
      .then((response) => {
        console.log(response);
        staticRaschetFormEl.cleanAll();
        //сделать сообщение об успешной отправке
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
        staticRaschetFormValidator.disableSaveButton();
        staticRaschetForm.reset();
        renderLoading(false, staticRaschetSubmitButton, 'Оставить заявку', 'Отправляем в Ютермо...');
      });
  },
  formCleanError: () => {}
}, staticRaschetForm, staticRaschetFormConfig.inputSelector);

staticRaschetFormEl.setEventListeners();