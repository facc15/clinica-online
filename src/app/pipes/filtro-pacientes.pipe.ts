import { Turno } from 'src/app/interfaces/turno';
import { TurnoService } from './../servicios/turnos.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Paciente } from '../clases/usuario';
import { AuthService } from '../servicios/auth.service';

@Pipe({
  name: 'filtroPacientes'
})
export class FiltroPacientesPipe implements PipeTransform {

  private turnosFiltrados!: Turno[];
  private pacientes: Paciente[];
  constructor(private turnoService: TurnoService, private auth: AuthService)
  {
    this.pacientes=[];
  }

  transform(pacientes: Paciente[], ...args: unknown[]): any
  {

    this.turnosFiltrados= this.turnoService.turnos.filter((turno)=>turno.uidEspecialista==this.auth.usuario.uid);

    pacientes.filter((paciente)=>{
       for (let turno of this.turnosFiltrados)
       {
        if(turno.uidPaciente==paciente.uid)
        {
          if(!this.pacientes.includes(paciente))
          {
            this.pacientes.push(paciente);
            break;
          }
        }

       }
    });

    return this.pacientes;
  }

}
