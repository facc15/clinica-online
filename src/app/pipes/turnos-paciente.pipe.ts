import { TurnoService } from 'src/app/servicios/turnos.service';
import { Especialista } from './../clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/interfaces/turno';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosPaciente'
})
export class TurnosPacientePipe implements PipeTransform {

  public turnosFiltrados :any;

  constructor(private auth: AuthService)
  {

  }

  transform(turnos: any[], ...args: unknown[]): any{


   this.turnosFiltrados=turnos.filter(turno=>turno.uidPaciente==this.auth.usuarioLog.uid);

    return this.turnosFiltrados;
  }

}
