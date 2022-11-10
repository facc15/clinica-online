import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from '../clases/usuario';
import { Turno } from '../interfaces/turno';
import { TurnoService } from '../servicios/turnos.service';

@Pipe({
  name: 'filtroEspecialistasAdministrador'
})
export class FiltroEspecialistasAdministradorPipe implements PipeTransform {

  especialistas: Especialista[];
  turnosDeUnEspecialista:Turno[];

  constructor(private turnoService: TurnoService)
  {
    this.especialistas=[];
    this.turnosDeUnEspecialista=[];
  }


  transform(especialistas: Especialista[], ...args: unknown[]): any {

    this.turnoService.turnos.filter((turno)=>{
      for (const especialista of especialistas)
      {
        if(turno.uidEspecialista==especialista.uid)
        {
          if(!this.especialistas.includes(especialista))
          this.especialistas.push(especialista);
          break;
        }

      }
    })

    return this.especialistas;
  }
}
