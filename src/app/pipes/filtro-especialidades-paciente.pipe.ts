import { Turno } from '../interfaces/turno';
import { Especialidades } from '../interfaces/especialidades';
import { Pipe, PipeTransform } from '@angular/core';
import { TurnoService } from '../servicios/turnos.service';
import { AuthService } from '../servicios/auth.service';

@Pipe({
  name: 'filtroEspecialidadesPaciente'
})
export class FiltroEspecialidadesPacientePipe implements PipeTransform {

  turnosDeUnPaciente: Turno[];
  especialidades: Especialidades[];

  constructor(private turnoService: TurnoService,private auth: AuthService)
  {
    this.turnosDeUnPaciente=[];
    this.especialidades=[];
  }

  transform(especialidades: Especialidades[], ...args: unknown[]): any {

    this.turnosDeUnPaciente= this.turnoService.turnos.filter((turno)=>turno.uidPaciente==this.auth.usuario.uid);

    for (let turnoPaciente of this.turnosDeUnPaciente)
    {
        for(let especialidad of especialidades)
        {
            if(turnoPaciente.especialidad==especialidad.especialidad)
            {
              if(!this.especialidades.includes(especialidad))
              {
                this.especialidades.push(especialidad);
                break;
              }

            }
        }
    }



    return this.especialidades;
  }

}
