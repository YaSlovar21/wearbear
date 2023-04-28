
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import './info-page.css';

import { initialArticles } from '../js/utils/articles.js';

const loc = window.location.pathname;
const metaFromGlobal = initialArticles.find((element) => element.linkPath === loc);

console.log(metaFromGlobal);


const bodyElem = document.querySelector('.info-section__photo-container');

//import ptoSnegHtml from '../articles/pto-snegotayanie.html';
import ptoAdvHtml from 'html-loader!../articles/advantage-plates/advantage-plates.html';
var el = document.createElement( 'html' );
el.innerHTML = ptoAdvHtml;

console.log(el.querySelector('.info__paragraph'));


console.log(typeof(ptoAdvHtml));

var swiper = new Swiper('.mySwiperInfoPage', {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 30,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

if (metaFromGlobal.images) {
  metaFromGlobal.images.asideImages.forEach((imgItem) => {
    const imgToAdd = document.createElement('img');
    imgToAdd.src = imgItem;
    swiper.appendSlide(
      `<div class="swiper-slide"><img src="${imgItem}"></div>`
    );
    //bodyElem.append(imgToAdd)
  })
}