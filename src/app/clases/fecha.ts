export class Fecha {

  mes: string;
  dia: string;
  diaNumero: string;
  mesNumero!: string;
  horas: string[];
  hora:string;

  constructor(numero:string,dia:string,mes:string,horas?:string[],mesNumero?:string,hora?:string)
  {
    this.mes=mes;
    this.dia=dia;
    this.diaNumero=numero;
    this.horas=[];
    this.hora="";
    this.mesNumero="";

    if(mesNumero)
    {
      this.mesNumero=mesNumero;
    }

    if(horas)
    this.horas=horas;


  }

}
