import { Turno } from 'src/app/interfaces/turno';
import { TurnoService } from 'src/app/servicios/turnos.service';
import { Especialista } from 'src/app/clases/usuario';
import { Fecha } from 'src/app/clases/fecha';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-horarios',
  templateUrl: './tabla-horarios.component.html',
  styleUrls: ['./tabla-horarios.component.css']
})
export class TablaHorariosComponent implements OnInit {

  @Input() fechaSeleccionada!: Fecha;
  @Input() especialistaSeleccionado!: Especialista;
  @Output() eventoHorarioSeleccionado= new EventEmitter<string>();
  public horarios : string[];
  public horariosDisponibles: string[];
  public horariosOcupados: string[];
  public turnosDeUnEspecialista: Turno[];

  constructor(private turnoService: TurnoService) {
    this.horarios=[];
    this.horariosDisponibles=[];
    this.horariosOcupados=[];
    this.turnosDeUnEspecialista=[];
   }

  ngOnInit(): void
  {
    this.turnoService.obtenerTurnos().subscribe((turnos)=>{
      if(this.fechaSeleccionada)
    {
      this.horarios=this.fechaSeleccionada.horas;
    }
      this.turnosDeUnEspecialista=turnos.filter
      (turno=>turno.uidEspecialista==this.especialistaSeleccionado.uid
        && turno.fecha.diaNumero==this.fechaSeleccionada.diaNumero
        && turno.fecha.dia==this.fechaSeleccionada.dia
        && turno.fecha.mes==this.fechaSeleccionada.mes);

      for (let turno of this.turnosDeUnEspecialista)
      {
        this.horariosOcupados.push(turno.fecha.hora);
      }

      for (let index = 0; index < this.horarios.length; index++)
      {
        for (const horaOcupada of this.horariosOcupados)
        {
            if(this.horarios[index]==horaOcupada)
            {
              this.horarios.splice(index,1);
              break;
            }
        }
      }

    });



  }

  elegirHorario(horario:string)
  {
    this.eventoHorarioSeleccionado.emit(horario);
  }

}
