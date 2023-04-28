import './popup.css';
import './apps.css';
import Popup from "../js/components/Popup.js";

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

/*
export const popupObjects = new Popup('.popup-objects')
const popupRaschet = new Popup('.popup-raschet');
const popupCallback = new Popup('.popup-callback');
*/

import {popupObjects, popupCallback, popupPodbor, uObjectsPopupList} from './apopups.js'



/*document.querySelector('.popup-callback').addEventListener('mousedown', ()=> {
  popupCallBack.open('Заявка на обратный звонок', 'Здравствуйте, перезвоните мне.');
});
document.querySelector('.callback-partner-button').addEventListener('mousedown', ()=> {
  popupCallBack.open('Запрос на сотрудничество', 'Здравствуйте, хочу узнать условия сотрудничества с заводом.');
});*/

const popupObjectsButton = document.querySelector('.popup-objects-button');
const popupPodborButton = document.querySelector('.popup-podbor-button');

document.querySelector('.popup-callback-button').addEventListener('mousedown', (evt)=> {
  if (!evt.target.classList.contains('aside__button_active')) {

    popupCallback.open();
    evt.target.classList.add('aside__button_active');3
  } else {

    popupCallback.close();
    evt.target.classList.remove('aside__button_active');
  }
});

popupObjectsButton.addEventListener('click', (evt)=> {
  console.log('543214');
  if (!popupObjectsButton.classList.contains('aside__button_active')) {
    uObjectsPopupList.renderItems();
    popupObjects.open();
    popupObjectsButton.classList.add('aside__button_active');
  } else {
    uObjectsPopupList.clear();
    popupObjects.close();
    popupObjectsButton.classList.remove('aside__button_active');
  }
});

popupPodborButton.addEventListener('click', (evt)=> {
  popupPodbor.open();
});

//    Форма--в--UPFOOTER     //
const upFooterFormConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

const upFooterForm = document.forms.upFooterForm;
const upFooterFormSubmitButton = upFooterForm.querySelector(upFooterFormConfig.submitButtonSelector);
const upFooterFormValidator = new FormValidator(upFooterFormConfig, upFooterForm);
upFooterFormValidator.enableValidation();

const upFooterFormStatic = new FormStatic({
  formSubmitHandler: (callBackData) => {
    renderLoading(true, upFooterFormSubmitButton, 'Оставить заявку', 'Отправляем в Ютермо...');

    formApi.sendBigForm(callBackData)
      .then((response) => {
        console.log(response);
        upFooterFormStatic.cleanAll();
        //сделать сообщение об успешной отправке
      })
      .catch((err) => console.log(err)) //сделать сообщение об успешной ошибке
      .finally(() => {
        upFooterFormValidator.disableSaveButton();
        upFooterForm.reset();
        renderLoading(false, upFooterFormSubmitButton, 'Оставить заявку', 'Отправляем в Ютермо...');
      });
  },
  formCleanError: () => {}
}, upFooterForm, upFooterFormConfig.inputSelector);

upFooterFormStatic.setEventListeners();

document.addEventListener('copy', (evt)=> {
  alert( evt.target.baseURI);

});