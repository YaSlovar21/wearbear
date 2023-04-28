const raschetData = JSON.parse(document.getElementById('jsraschet').textContent);

const needSimilarPtoButton = document.querySelector('.listchoices__link_similar');

const similarMessage = `Нужен теплообменник наподобие данного (расчёт № ${raschetData.tiNumberFromTm}) мощностью  ${raschetData.moshnostNumber} ${raschetData.moshnostMeasure}`;
const textAreaUpf = document.forms.upFooterForm.querySelector('.form__input_type_textarea');
const upf = document.querySelector('.upf');
needSimilarPtoButton.addEventListener('click', (evt)=> {
  evt.preventDefault();
  textAreaUpf.textContent = similarMessage;

  upf.scrollIntoView({
    behavior: 'smooth'
  });
})