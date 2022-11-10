import { AuthService } from './../../../../servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turnos.service';
import { Turno } from 'src/app/interfaces/turno';
import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Paciente } from 'src/app/clases/usuario';

@Component({
  selector: 'app-ver-historia-clinica',
  templateUrl: './ver-historia-clinica.component.html',
  styleUrls: ['./ver-historia-clinica.component.css']
})
export class VerHistoriaClinicaComponent implements OnInit {

  public turnos: Turno[];
  @Input() paciente!: Paciente;
  @Output() eventoVolver=new EventEmitter<void>();


  constructor(public turnoService: TurnoService) {
    this.turnos=[];

   }

  ngOnInit(): void
  {
    this.turnoService.obtenerTurnos().subscribe((turnos)=>{
     this.turnos=turnos.filter((turno)=>turno.uidPaciente==this.paciente.uid && turno.estado=='finalizado');
      console.log(this.turnos);
    });
  }

  volver()
  {
    this.eventoVolver.emit();
  }

}
