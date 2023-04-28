import './constructor.css';
//import "@babel/polyfill";

import { jsPDF } from "jspdf";
import { Canvg } from 'canvg';

const getPdf = async () => {
  //Get svg markup as string
  let svg = document.getElementById('svg-container').innerHTML;

    if (svg) {
        svg = svg.replace(/\r?\n|\r/g, '').trim();
    }

  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);
  //---canvg(canvas, svg);
  
  //const v = await Canvg.from(context, svg);
  //v.render();

  let imgData = canvas.toDataURL('image/png');

  // Generate PDF0 0 1169 368
  let doc = new jsPDF('p', 'pt', 'a4');
  //doc.addImage(imgData, 'PNG', 0, 0, 1169, 368);
  //addSvgAsImage(SVG-Data, x, y, width, height, alias, compression, rotation)
  await doc.addSvgAsImage(svg, 0, 0, 390, 123 , '', false);
  doc.save('test.pdf');
}

document.querySelector("#getPdf").addEventListener("click", getPdf);