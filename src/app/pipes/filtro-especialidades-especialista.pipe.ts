import { Pipe, PipeTransform } from '@angular/core';
import { Especialidades } from '../interfaces/especialidades';
import { Turno } from '../interfaces/turno';
import { AuthService } from '../servicios/auth.service';
import { TurnoService } from '../servicios/turnos.service';

@Pipe({
  name: 'filtroEspecialidadesEspecialista'
})
export class FiltroEspecialidadesEspecialistaPipe implements PipeTransform {
  turnosDeUnEspecialista: Turno[];
  especialidades: Especialidades[];

  constructor(private turnoService: TurnoService,private auth: AuthService)
  {
    this.turnosDeUnEspecialista=[];
    this.especialidades=[];
  }

  transform(especialidades: Especialidades[], ...args: unknown[]): any {

    this.turnosDeUnEspecialista= this.turnoService.turnos.filter((turno)=>turno.uidEspecialista==this.auth.usuario.uid);

    for (let turnoEspecialista of this.turnosDeUnEspecialista)
    {
        for(let especialidad of especialidades)
        {
            if(turnoEspecialista.especialidad.especialidad==especialidad.especialidad)
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
