import './docs.css';

const docsSect = document.querySelector('.burton__subtitle');

function docsready() {
  docsSect.scrollIntoView({
    behavior: 'smooth'
  });
}

window.onload = docsready;