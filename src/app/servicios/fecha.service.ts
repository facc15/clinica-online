import { Fecha } from 'src/app/clases/fecha';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }

  public obtenerFechaDeHoy()
  {
   const hoy=new Date();
   hoy.getDate();
          //const fechaFormato=format(hoy,'EEEE dd MMMM - HH:mm aaa', { locale: es });
   const dia=format(hoy,'EEEE',{locale:es});
   const numero=format(hoy,'dd',{locale:es});
   const mes=format(hoy,'MMMM',{locale:es});
   const anio=format(hoy,'yyyy',{locale:es});


   return dia + " "+numero+" de "+mes+" del "+anio;
  }

  public obtenerFechaLog()
  {
    const hoy=new Date();
    hoy.getDate();

    const hora= format(hoy,'HH',{locale:es});
    const minuto= format(hoy,'mm',{locale:es});
    const dia=format(hoy,'dd',{locale:es});
    const mesNumero= format(hoy,'MM',{locale:es});

    const fecha= {dia:dia,mes:mesNumero,hora:hora,minuto:minuto};

    return fecha;

  }


}
