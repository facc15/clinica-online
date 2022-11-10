import { AuthService } from './../../../../servicios/auth.service';
import { TurnoService } from './../../../../servicios/turnos.service';
import { Turno } from './../../../../interfaces/turno';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Paciente } from 'src/app/clases/usuario';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.css']
})
export class TurnosPacienteComponent implements OnInit {

  @Input() paciente!: Paciente;
  @Input() turnos!: Turno[];

  @Output() eventoTurnoModificado=new EventEmitter<Turno>();

  turnosFiltrados: Turno[];


  public resenia:string;
  public verRese:boolean=false;
  public modificando: boolean=false;

  public cancelado:boolean=false;
  public rechazado: boolean=false;
  public aceptado: boolean=false;
  public finalizado: boolean=false;
  public completaHistoriaClinica:boolean=false;

  public turnoElegido!: Turno;



  constructor(public auth: AuthService) {

    this.turnosFiltrados=[];
    this.resenia="";
   }

  ngOnInit(): void
  {
    this.turnosFiltrados= this.turnos.filter(turno=>turno.uidPaciente==this.paciente.uid);
  }


  cancelarElTurno(turno: any)
  {
    this.modificando=true;
    this.cancelado=true;
    this.turnoElegido=<Turno>turno;
  }


  modificado(event: Turno)
  {
    this.eventoTurnoModificado.emit(event);
  }

  rechazarTurno(turno: any)
  {
    this.modificando=true;
    this.rechazado=true;
    this.turnoElegido=<Turno>turno;
  }

  aceptarTurno(turno: Turno)
  {
    this.modificando=true;
    this.aceptado=true;
    this.turnoElegido=turno;
  }

  finalizarTurno(turno: Turno)
  {
    this.completaHistoriaClinica=true;
    this.turnoElegido=turno;
  }


  verResenia(turno: Turno)
  {
    this.verRese=true;
    this.cancelado=false;
    this.turnoElegido=turno;
  }


  volver()
  {
    this.cancelado=false;
    this.completaHistoriaClinica=false;
    this.verRese=false;
    this.modificando=false;
  }



}
