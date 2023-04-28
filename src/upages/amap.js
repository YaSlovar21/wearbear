
const activeRegions = [
  '91', //крым
  '20', //чеченская респ
  '16', //татарстан
  '93', //краснодар
  '01', //адыгея
  '56', //оренбург
  '26', //ставрополь
  '87', //чукотка, анадырь
  '14', //саха якутия
  '25', //приморский край
];

const mapEl = document.querySelector('.map-svg');


import { uObjectsPopupList } from './apopups.js';
import { initialArticles } from '../js/utils/articles.js';

import {popupObjects, popupCallback} from './apopups.js';

const activeRegionsSvg = Array.from(mapEl.querySelectorAll('path')).filter(function(item) {
  return activeRegions.includes(item.dataset.region);
});


function filterArticlesByRegion (regionNumber) {
  return initialArticles.filter(function (item) {
    return item.images.regionNumber === regionNumber;
  })
}

console.log(filterArticlesByRegion('16'));


activeRegionsSvg.forEach((item) => {

    item.classList.add('mapelactive');
    item.addEventListener('click', (evt) => {
      uObjectsPopupList.clear();
      uObjectsPopupList.renderFiltered(filterArticlesByRegion(evt.target.dataset.region))
      popupObjects.open();
    })

});


