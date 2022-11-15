import { AuthService } from 'src/app/servicios/auth.service';
import { Injectable, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private auth:AuthService) {

   }

   public obtenerFechaDeHoy()
   {
    const hoy=new Date();
    hoy.getDate();

    //const fechaFormato=format(hoy,'EEEE dd MMMM - HH:mm aaa', { locale: es });

    const dia=format(hoy,'EEEE',{locale:es});
    const numero=format(hoy,'dd',{locale:es});
    const mes=format(hoy,'MMMM',{locale:es});
    const mesNumero= format(hoy,'MM',{locale:es});
    const anio=format(hoy,'yyyy',{locale:es});

    return dia + " "+numero+" de "+mes+" del "+anio;
   }

  async descargarPdf(contenido:string)
  {

    const definicionPdf:any={
      content:[
        {
          text:this.obtenerFechaDeHoy(),
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
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
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
