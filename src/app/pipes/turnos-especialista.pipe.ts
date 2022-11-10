import { AuthService } from './../servicios/auth.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosEspecialista'
})
export class TurnosEspecialistaPipe implements PipeTransform {
  private turnosFiltrados: any[];

  constructor(private auth: AuthService){
    this.turnosFiltrados=[];
  }

  transform(turnos:any[], ...args: unknown[]): any
  {
    this.turnosFiltrados=turnos.filter(turno=>turno.uidEspecialista==this.auth.usuarioLog.uid);

    return this.turnosFiltrados;
  }

}
