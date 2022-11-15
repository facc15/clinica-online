import { Turno } from 'src/app/interfaces/turno';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosEspecialistaPacienteOrdenado'
})
export class TurnosEspecialistaPacienteOrdenadoPipe implements PipeTransform
{
  public turnosFiltrados:Turno[];
  public turnosFiltradosOrdenados:Turno[];

  constructor()
  {
    this.turnosFiltrados=[];
    this.turnosFiltradosOrdenados=[];
  }

  transform(turnos: Turno[], uidPaciente: string): Turno[]
  {
    this.turnosFiltrados= turnos.filter(turno=>turno.uidPaciente==uidPaciente);


    this.turnosFiltradosOrdenados=this.turnosFiltrados.sort((a,b)=>{

      const AmesNumero= parseInt(a.fecha.mesNumero);
      const BmesNumero= parseInt(b.fecha.mesNumero);
      const AdiaNumero= parseInt(a.fecha.diaNumero);
      const BdiaNumero= parseInt(b.fecha.diaNumero);

      if(AmesNumero>BmesNumero)
      {
       return -1;
      }else if(AmesNumero<BmesNumero)
      {
       return 1;
      }else
      {
        if(AdiaNumero>BdiaNumero)
        {
          return -1;
        }else(AdiaNumero<BdiaNumero)
        {
          return 1;
        }
       return 0;
      }
   });

   if(this.turnosFiltradosOrdenados.length>3)
   {
    this.turnosFiltradosOrdenados.splice(3);
   }


    console.log(this.turnosFiltradosOrdenados);

    return this.turnosFiltradosOrdenados;
  }

}
