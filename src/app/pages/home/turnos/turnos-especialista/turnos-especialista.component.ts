import { AuthService } from './../../../../servicios/auth.service';
import { Especialista } from './../../../../clases/usuario';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';

@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.css']
})
export class TurnosEspecialistaComponent implements OnInit {

  @Input() turnos: Turno[];
  @Input() especialista!: Especialista;
  @Input() esPaciente: boolean=false;
  @Input() esAdmin: boolean=false;

  turnosFiltrados: Turno[];

  @Output() eventoTurnoModificado=new EventEmitter<Turno>();

  public cancelado:boolean=false;
  public modificando:boolean=false;
  public resenia:string;
  public verRese:boolean=false;
  public encuesta:boolean=false;
  public califica:boolean=false;

  public turnoElegido!: Turno;

  constructor(public auth:AuthService)
  {
    this.turnos=[];
    this.turnosFiltrados=[];
    this.resenia="";
  }

  ngOnInit(): void {
    this.turnosFiltrados= this.turnos.filter(turno=>turno.uidEspecialista==this.especialista.uid);
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

  cancelar()
  {
    this.cancelado=false;
  }

  verResenia(turno: Turno)
  {
    this.verRese=true;
    this.cancelado=false;
    this.turnoElegido=turno;
  }

  completarEncuesta(turno: Turno)
  {
    this.encuesta=true;
    this.turnoElegido=turno;
  }

  calificarAtencion(turno: Turno)
  {
    this.califica=true;
    this.turnoElegido=turno;
  }

  volver()
  {
    this.califica=false;
    this.encuesta=false;
    this.cancelado=false;
    this.verRese=false;
    this.modificando=false;
  }

}
