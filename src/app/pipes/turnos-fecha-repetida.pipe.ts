import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';

@Pipe({
  name: 'turnosFechaRepetida'
})
export class TurnosFechaRepetidaPipe implements PipeTransform
{
  public turnos:Turno[];
  public turnoAnterior: Turno | null=null;

  constructor()
  {
    this.turnos=[];
  }

  transform(turnos: Turno[], ...args: unknown[]): Turno[]
  {
    console.log(turnos);
    turnos.filter((turno)=>{

      if(!this.turnoAnterior)
      {

      this.turnoAnterior=turno;
      this.turnos.push(turno);
      }else
      {
        if(this.turnoAnterior.fecha.dia == turno.fecha.dia && this.turnoAnterior.fecha.mes==turno.fecha.mes
          && this.turnoAnterior.fecha.diaNumero == turno.fecha.diaNumero)
        {

        }else
        {
          this.turnos.push(turno);
          this.turnoAnterior=turno;
        }
      }

    });

    return this.turnos;
  }

}
