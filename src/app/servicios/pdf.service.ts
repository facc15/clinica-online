import { Injectable } from '@angular/core';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  descargarPdf(contenido:any)
  {
    const definicionPdf:any={
      content:[
        {
          text:contenido.especialidad
        },
        {
          image:'../assets/logo.jpg',
          width: 50,
          height: 50,

        }
      ]
    }



    const pdf=pdfMake.createPdf(definicionPdf);

    pdf.open();
  }
}
