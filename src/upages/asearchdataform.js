
import Section from '../js/components/Section.js';

const searchDataForm = document.forms.searchdataform;

searchDataForm.addEventListener("change", (evt)=> {

})

const searchDataFormInput = searchDataForm.querySelector('.form-search__input');

const raschetLinksOnPage = Array.from(document.querySelectorAll('.ras'));

const raschetLinksOnPageSorted = raschetLinksOnPage.sort(function(a, b) {
  return a.dataset.moshnost - b.dataset.moshnost;
});






searchDataFormInput.addEventListener('input', (evt) => {

  if (evt.target.value != '') {
    let poplovok = 0;
    raschetLinksOnPageSorted.forEach((item, i)=> {
      if (Number(item.dataset.moshnost) <= Number(evt.target.value)) {
        poplovok = i;
      }
    });
    document.querySelector('.ras-list').innerHTML = '';
    console.log(poplovok);
    if (poplovok > 3) {
      for (let li of raschetLinksOnPageSorted.slice(poplovok-3, poplovok+3)) {
        document.querySelector('.ras-list').appendChild(li);
      }
    } else {
      for (let li of raschetLinksOnPageSorted.slice(0, poplovok + 3)) {
        document.querySelector('.ras-list').appendChild(li);
      }
    }


  } else
  {
    for (let li of raschetLinksOnPage) {
      document.querySelector('.ras-list').appendChild(li);
    }
  }

  document.querySelector('.scroll-point').scrollIntoView({
    behavior: 'smooth'
  });
});