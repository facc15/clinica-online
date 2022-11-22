import { Fecha } from 'src/app/clases/fecha';
import { AuthService } from './../../../../servicios/auth.service';
import { TurnoService } from './../../../../servicios/turnos.service';
import { Especialista } from 'src/app/clases/usuario';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';

@Component({
  selector: 'app-turnos-especialidad',
  templateUrl: './turnos-especialidad.component.html',
  styleUrls: ['./turnos-especialidad.component.css']
})
export class TurnosEspecialidadComponent implements OnInit {

  public turnosFiltrados: Turno[];
  @Input() turnos: Turno[];
  @Input() esEspecialista:boolean=false;
  @Input() esPaciente: boolean=false;
  @Input() esAdmin: boolean=false;
  @Input() especialidad!: any;
  @Input() estado!: any;
  @Input() fecha!: Fecha;

  @Output() eventoTurnoModificado=new EventEmitter<Turno>();

  public modificando:boolean=false;

  public cancelado:boolean=false;
  public rechazado: boolean=false;
  public aceptado: boolean=false;
  public completaHistoriaClinica: boolean=false;

  public encuesta: boolean=false;
  public califica:boolean=false;
  public verRese:boolean=false;
  public turnoElegido!: Turno;

  constructor(private turnoService: TurnoService,public auth: AuthService) {
    this.turnosFiltrados=[];
    this.turnos=[];
  }

  ngOnInit(): void {
    if(this.especialidad)
    {
      this.turnosFiltrados= this.turnos.filter(turno=>turno.especialidad.especialidad==this.especialidad);
      //console.log(this.turnosFiltrados);

    }else if(this.estado)
    {
      this.turnosFiltrados=this.turnos.filter(turno=>turno.estado==this.estado);
    }else if(this.fecha)
    {
      this.turnosFiltrados=this.turnos.filter(turno=>turno.fecha.diaNumero==this.fecha.diaNumero && turno.fecha.mes==this.fecha.mes);
      console.log(this.turnosFiltrados);
    }else
    {
      this.turnosFiltrados=this.turnos;
    }


  }

  cancelarElTurno(turno: any)
  {
    this.modificando=true;
    this.cancelado=true;
    this.turnoElegido=<Turno>turno;
  }


  rechazarTurno(turno: any)
  {
    this.modificando=true;
    this.rechazado=true;
    this.turnoElegido=<Turno>turno;
  }


  modificado(event: Turno)
  {
    this.eventoTurnoModificado.emit(event);
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

  completarEncuesta(turno: Turno)
  {
    this.encuesta=true;
    this.modificando=true;
    this.turnoElegido=turno;
  }

  verResenia(turno: Turno)
  {
    this.verRese=true;
    this.cancelado=false;
    this.rechazado=false;
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
    this.rechazado=false;
    this.completaHistoriaClinica=false;
    this.verRese=false;
    this.modificando=false;
  }

}
