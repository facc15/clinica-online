export class Fecha {

  mes: string;
  dia: string;
  diaNumero: string;
  horas: string[];
  hora:string;

  constructor(numero:string,dia:string,mes:string,horas?:string[],hora?:string)
  {
    this.mes=mes;
    this.dia=dia;
    this.diaNumero=numero;
    this.horas=[];
    this.hora="";

    if(horas)
    this.horas=horas;


  }

}
