import CardRaschet from "../js/components/CardRaschet.js";
import Section from "../js/components/Section.js";

const loc = window.location.pathname.split('/')[3];
console.log(loc);

const allRaschets = JSON.parse(document.getElementById('jsraschets').textContent);

const raschetsForPage = allRaschets.filter(function(raschet) {
  return raschet.typeId === loc;
});

Array.from(document.querySelectorAll('.listchoices__link')).forEach((item) => {
  if (item.href.split('/')[ item.href.split('/').length - 2] === loc) {
    item.closest('.listchoices__list-item').classList.add('listchoices__list-item_active');
  }
})

console.log(raschetsForPage);

const raschetList = new Section({
  data: raschetsForPage,
  renderer: (item)=> {
    const card = new CardRaschet({

      name: item.name,
      link: `/plastinchatye-teploobmenniki/raschets/${item.path}.html`,
      desc: `${item.name} ${item.sreda1} ${item.sreda2}`,

      cardTemplateSelector: '#item-raschet-page-type',
      cardSelector: '.recomendations__list-item',
    });
    const cardElement = card.generateCard();
    raschetList.appendItem(cardElement);
  }
}, '.recomendations__list');

raschetList.renderItems();