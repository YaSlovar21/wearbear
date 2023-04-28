import './lppto.css';
import simpleParallax from 'simple-parallax-js';

import KinopoiskSection from '../js/ucomponents/KinopoiskSection.js';

import {
  initialArticles,
} from '../js/utils/articles.js';

import {
  initialHeatEx,
} from '../js/utils/constants.js';

import { articlesMapperForPtoPage } from '../js/utils/utils.js';

const ipls = Array.from(document.querySelectorAll('.interactive-plates-list__item'));
const secretSection = document.querySelector('.to-info-secret');

const kps = new KinopoiskSection();
kps.setEventListeners();

Array.from(document.querySelectorAll('.uplates__plast')).forEach(item => {
  item.addEventListener('click', (evt) => {
    console.log(initialHeatEx[evt.target.dataset.pto])
    kps.open(initialHeatEx[evt.target.closest('.uplates__plast').dataset.pto]);
  });
});

let iplActive = null;

ipls.forEach((item)=> {
  item.addEventListener('click', (evt)=> {
    iplActive = evt.target;
    secretSection.classList.add('to-info-secret_active');
    secretSection.scrollIntoView({
      behavior: 'smooth'
    });
  })
});

console.log(initialArticles);



// Объекты на странице Пластинчатые теплообменники //
import CardObjectUtermo from '../js/components/CardObjectUtermo.js';
import Section from '../js/components/Section.js';
import SectionPaginator from '../js/components/SectionPaginator.js';
const moreButton = document.querySelector('.apps__more-button');

const sectionList = new SectionPaginator({
  data: initialArticles,
  renderer: (item) => {
    const card = new CardObjectUtermo({
      title: item.heading,
      desc: item.description,
      link: item.linkPath,
      posterLink: item.images.poster,
      handleObjectClick: (obj) => {
        //(desc, link) передаем во внутреннем методе карточки
        //popupImage.open({
        //  link: link,
        //  name: desc,
        //});
        console.log(obj);
      },
      cardTemplateSelector: '#oblast-item-template',
      cardSelector: '.apps__card',
    });

    const cardElement = card.generateCard()
    sectionList.appendItem(cardElement);
  },
}, '.apps__dynamic-section', moreButton);

sectionList.renderItems();


const formFilter = document.forms.formChoice;

formFilter.addEventListener("change", () => {
  console.log([formFilter.radio.value]);
  sectionList.renderFiltered(articlesMapperForPtoPage([formFilter.radio.value], initialArticles));
});

let pictic = document.querySelector('.parallax-line');
new simpleParallax(pictic, {
	delay: 0.5,
  overflow: true,
  scale: 3.2,
  orientation: 'left',
	transition: 'ease-out',
  customWrapper: '.two-columns__main-text',
});
