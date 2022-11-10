import { TurnoService } from './../servicios/turnos.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEspecialidadesAdministrador'
})
export class FiltroEspecialidadesAdministradorPipe implements PipeTransform {

  turnosFiltrados:any[];

  constructor(private turnoService: TurnoService)
  {
    this.turnosFiltrados=[];
  }


  transform(especialidades: any[], ...args: unknown[]): any
  {
   this.turnoService.turnos.filter((turno)=>{
          for (let especialidad of especialidades)
          {
              if(especialidad.especialidad==turno.especialidad)
              {
                if(!this.turnosFiltrados.includes(especialidad))
                this.turnosFiltrados.push(especialidad);
                break;
              }
          }
   });

    return this.turnosFiltrados;
  }

}
