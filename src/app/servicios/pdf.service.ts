import { AuthService } from 'src/app/servicios/auth.service';
import { Injectable } from '@angular/core';

import { FechaService } from './fecha.service';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private fechaService: FechaService, private auth:AuthService) {

   }

  async descargarPdf(contenido:string)
  {

    const definicionPdf:any={
      content:[
        {
          text:this.fechaService.obtenerFechaDeHoy(),
          alignment: "right",
          margin: [0, 0, 0, 20]
        },
        {
          text:"CLINICA EL LOBO",
          alignment: "center",

          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 20]
        },
        {
          image: await this.getBase64ImageFromURL("../../assets/logo.jpg"),
          width: 60,
          height: 60,
          alignment: "center",
        },
        {
          text:"Atenciones de "+this.auth.usuario.nombre+" "+this.auth.usuario.apellido,
          alignment: "center",
          style: 'subheader'
        },
        {
          text:contenido
        }
      ],
      styles: {
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0, 40, 0, 40]
        },
      }
    }

    const pdf=pdfMake.createPdf(definicionPdf);

    pdf.download(this.auth.usuario.apellido+this.auth.usuario.nombre+".pdf");
  }

  getBase64ImageFromURL(url:any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}
