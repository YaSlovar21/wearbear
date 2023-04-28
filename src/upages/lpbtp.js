import './lpbtp.css';

import { schemesDg } from '../js/utils/constants.js';

import DynamicGrid from '../js/ucomponents/DynamicGrid.js';


import { getItemByUniqueId } from '../js/utils/utils.js';


const dgPopup = new DynamicGrid();
dgPopup.setEventListeners();

Array.from(document.querySelectorAll('.dg__list-item')).forEach(item => {
  item.addEventListener('click', (evt) => {
    dgPopup.open(getItemByUniqueId(evt.target.closest('.dg__list-item').dataset.scheme, schemesDg))
  });
});


// Объекты на странице БТП //

import {
  initialArticles,
} from '../js/utils/articles.js';

import { articlesMapperForPtoPage } from '../js/utils/utils.js';

import CardObjectUtermo from '../js/components/CardObjectUtermo.js';
import Section from '../js/components/Section.js';
import SectionPaginator from '../js/components/SectionPaginator.js';
const moreButton = document.querySelector('.apps__more-button');

const sectionList = new SectionPaginator({
  data: articlesMapperForPtoPage(['btp'], initialArticles),
  renderer: (item) => {
    const card = new CardObjectUtermo({
      title: item.heading,
      desc: item.description,
      link: item.linkPath,
      posterLink: item.images.poster,
      geo: item.images.regionName,
      handleObjectClick: (obj) => {
        //(desc, link) передаем во внутреннем методе карточки
        //popupImage.open({
        //  link: link,
        //  name: desc,
        //});
        console.log(obj);
      },
      cardTemplateSelector: '#btpobject-item-template',
      cardSelector: '.apps__card',
    });

    const cardElement = card.generateCard();
    sectionList.appendItem(cardElement);
  },
}, '.apps__dynamic-section', moreButton);

sectionList.renderItems();