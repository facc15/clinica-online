import { AuthService } from './../servicios/auth.service';
import { Turno } from './../interfaces/turno';
import { TurnoService } from './../servicios/turnos.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Paciente, Especialista } from 'src/app/clases/usuario';

@Pipe({
  name: 'filtroPacientesEspecialista'
})
export class FiltroPacientesEspecialistaPipe implements PipeTransform {

  private turnos!:Turno[];
  private turnosFiltrados!:Turno[];
  private pacientes!: Paciente[];
  private especialista!: Especialista;

  constructor(private turnoService: TurnoService,private auth: AuthService)
  {
    this.turnos=[];
    this.pacientes=[];
    this.auth.getState().subscribe((res)=>{
      if(res)
      {
        this.especialista=<Especialista>this.auth.usuario;
      }
    })

  }


  transform(pacientes: Paciente[], ...args: unknown[]): Paciente[]
  {
    this.turnoService.obtenerTurnos().subscribe((turnos)=>{
      this.turnosFiltrados= turnos.filter((turno)=>turno.uidEspecialista==this.especialista.uid);

      pacientes.filter((paciente)=>{

        this.turnosFiltrados.filter((turno)=>
        {
          if(turno.uidPaciente==paciente.uid)
          {
            if(!this.pacientes.includes(paciente))
            this.pacientes.push(paciente);

          }
        });
        });

    });

    return this.pacientes;
  }

}
