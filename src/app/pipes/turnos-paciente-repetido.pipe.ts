import { Turno } from 'src/app/interfaces/turno';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosPacienteRepetido'
})
export class TurnosPacienteRepetidoPipe implements PipeTransform {
  turnosFiltrados:Turno[];

  constructor()
  {
    this.turnosFiltrados=[];
  }

  transform(turnos:  Turno[], ...args: unknown[]): Turno[]
  {


    for(let turno of turnos)
    {
      if(!this.turnosFiltrados.includes(turno))
      this.turnosFiltrados.push(turno);
    }
    console.log(this.turnosFiltrados);
    return this.turnosFiltrados;
  }

}
