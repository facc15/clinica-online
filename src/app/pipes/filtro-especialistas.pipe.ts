import { Especialista } from './../clases/usuario';
import { Turno } from './../interfaces/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from './../servicios/turnos.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEspecialistas'
})
export class FiltroEspecialistasPipe implements PipeTransform {

  especialistas: Especialista[];
  turnosDeUnEspecialista:Turno[];
  turnosDeUnPaciente: Turno[];

  constructor(private turnoService: TurnoService,private auth: AuthService)
  {
    this.especialistas=[];
    this.turnosDeUnEspecialista=[];
    this.turnosDeUnPaciente=[];
  }


  transform(especialistas: Especialista[], ...args: unknown[]): any {


    this.turnosDeUnPaciente= this.turnoService.turnos.filter(turno=>turno.uidPaciente==this.auth.usuario.uid);

    for (let turnoPaciente of this.turnosDeUnPaciente)
    {
        for(let especialista of especialistas)
        {
            if(turnoPaciente.uidEspecialista==especialista.uid)
            {
              if(!this.especialistas.includes(especialista))
              {
                this.especialistas.push(especialista);
                break;
              }

            }
        }
    }

    return this.especialistas;
  }

}
