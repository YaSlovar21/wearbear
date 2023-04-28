import './info-razdel.css';

import {
  initialArticles,
} from '../js/utils/articles.js';

import BlogCard from '../js/ucomponents/BlogCard.js';
import SectionPaginatorHybrid from '../js/ucomponents/SectionPaginatorHybrid';

const moreButton = document.querySelector('.blog-grid__more-button');

const blogSection = new SectionPaginatorHybrid(
  {
    data: initialArticles,
    renderer: (item) => {
      const card = new BlogCard({
        cardSize: item.size,
        isColorInverse: item.isColorInverse,
        path: item.linkPath,
        name: item.heading,
        description: item.description,

        //базовые
        cardSelector: '.blog-grid__list-item',
        cardTemplateSelector: '#blog-card',
        animateClass: '',
      });

      const cardElement = card.generateCard();
      blogSection.appendItem(cardElement);
    }
  },
  '.blog-grid__list', //контейнер
  moreButton,         //"показать еще"
);

blogSection.renderItems();