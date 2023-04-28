import './index.css';

import simpleParallax from 'simple-parallax-js';

const pto = document.querySelector('.mainpage-pto__image-container');
const parallaxBgAbout = document.querySelector('.parallax-bg-about');


import '../userfiles/katalog-blochnyh-teplovyh-punktov.pdf';
import '../userfiles/list-podbora-teploobmennikov-i-nasosov.pdf';
import '../userfiles/oprosnyy-list-dlya-btp-teplovogo-punkta.docx';
import '../userfiles/oprosnyy-list-dlya-podbora-teploobmennika-basseyn.doc';
import '../userfiles/oprosnyy-list-dlya-podbora-teploobmennika-moloko.doc';
import '../userfiles/oprosnyy-list-dlya-podbora-teploobmennika-pasterizaciya-ohlazhdenie.doc';
import '../userfiles/oprosnyy-list-dlya-podbora-teploobmennika-pivnoe-suslo.doc';
import '../userfiles/oprosnyy-list-dlya-podbora-teploobmennika.doc';
import '../userfiles/poyasnitelnaya-zapiska-k-proektu-teplovogo-punkta.pdf';
import '../userfiles/primer-podbora-teplovogo-punkta.pdf';
import '../userfiles/primer-principialnoy-skhemy-teplovogo-punkta.pdf';
import '../userfiles/primer-rasstanovki-blokov-teplovogo-punkta.pdf';
import '../userfiles/sp-510-teplovye-punkty-i-sistemy-vnutrennego-teplosnabzheniya.pdf';
import '../userfiles/specifikaciya-oborudovaniya-teplovogo-punkta.pdf';
import '../userfiles/termoblok-catalog.pdf';


new simpleParallax(pto, {
	delay: .5,
  overflow: true,
  scale: 1.2,
	transition: 'ease-out',
  customWrapper: '.flexburton__right-side',
});

new simpleParallax(parallaxBgAbout, {
  orientation: 'down',
	delay: .5,
  overflow: true,
  scale: 1.05,
});

Array.from(document.querySelectorAll('.smooth-scroll-link')).map((item, index) =>{
  item.addEventListener('click', (evt)=> {
    evt.preventDefault();
    document.querySelector(evt.target.dataset.scroll).scrollIntoView({
      behavior: 'smooth'
    });
  })
});