
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import './info-page.css';

import { initialArticles } from '../js/utils/articles.js';

const loc = window.location.pathname;
const metaFromGlobal = initialArticles.find((element) => element.linkPath === loc);

console.log(metaFromGlobal);


const metaContainer = document.querySelector('.meta');
const posterImg = document.querySelector('.info__aside-img');

if (metaFromGlobal.images) {
  posterImg.src = metaFromGlobal.images.asideImages[0];
}

if (metaFromGlobal.images) {
  metaFromGlobal.images.asideImages.forEach((imgItem) => {
    const metaListItem = document.createElement('li');
    metaListItem.classList.add('meta__list-item');
    const imgToAdd = document.createElement('img');
    imgToAdd.src = imgItem;
    imgToAdd.classList.add('meta__photo');

    metaListItem.append(imgToAdd);
    metaContainer.append(metaListItem);
    //bodyElem.append(imgToAdd)
  })
}