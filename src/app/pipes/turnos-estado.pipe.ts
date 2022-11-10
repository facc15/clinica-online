import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';

@Pipe({
  name: 'turnosEstado'
})
export class TurnosEstadoPipe implements PipeTransform {

  public turnosFiltrados: Turno[];
  public estados: string[];

  constructor()
  {
    this.turnosFiltrados=[];
    this.estados=[];
  }

  transform(turnos: Turno[], ...args: unknown[]): Turno[]
  {

    turnos.filter((turno)=>{

      if(!this.estados.includes(turno.estado))
      {
        this.estados.push(turno.estado);
        this.turnosFiltrados.push(turno);
      }
    });

    return this.turnosFiltrados;
  }

}
