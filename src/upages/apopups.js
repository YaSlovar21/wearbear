import Popup from "../js/components/Popup.js";
import CardObjectUtermo from "../js/components/CardObjectUtermo.js";
import Section from "../js/components/Section.js";

export const popupObjects = new Popup('.popup-objects')
export const popupPodbor = new Popup('.popup-podbor');
export const popupCallback = new Popup('.popup-callback');

import {
  initialArticles,
} from '../js/utils/articles.js';

const uObjects = initialArticles.filter(function(item) {
  return item.isObj;
});


export const uObjectsPopupList = new Section({
  data: uObjects,
  renderer: (item) => {
    const card = new CardObjectUtermo({

      title: item.heading,
      desc: item.description,
      link: item.linkPath,
      posterLink: item.images.poster,
      geo: item.images.regionName,
      handleObjectClick : () => {
      },
      cardTemplateSelector: '#item-obj-in-popup-template',
      cardSelector: '.apps__card',
    });
    const cardEl = card.generateCard();
    uObjectsPopupList.appendItem(cardEl);
  }
}, '.popup__reference-section')