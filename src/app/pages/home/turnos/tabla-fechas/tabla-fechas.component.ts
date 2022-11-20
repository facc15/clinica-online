import { Turno } from 'src/app/interfaces/turno';
import { Especialista } from 'src/app/clases/usuario';
import { AuthService } from './../../../../servicios/auth.service';
import { Fecha } from 'src/app/clases/fecha';
import { TurnoService } from 'src/app/servicios/turnos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-fechas',
  templateUrl: './tabla-fechas.component.html',
  styleUrls: ['./tabla-fechas.component.css']
})
export class TablaFechasComponent implements OnInit {

  public fechas: Fecha[];
  public turnosDeEspecialista: Turno[];
  public fechasFiltradas!: Fecha[];

  @Input() especialista!: Especialista;

  @Output() eventoFechaSeleccionada= new EventEmitter<Fecha>();

  constructor(private turnoService: TurnoService,private auth: AuthService) {
    this.fechas=[];
    this.turnosDeEspecialista=[];
    this.fechasFiltradas=[];
   }

  ngOnInit(): void {

    this.fechas=this.turnoService.traerFechas();


    for(let fecha of this.fechas)
    {
      if(!this.fechasFiltradas.includes(fecha))
      {
        this.fechasFiltradas.push(fecha);
      }
    }

    console.log("traje a "+this.especialista.nombre);

  }

  elegirFecha(fecha: Fecha)
  {
    this.eventoFechaSeleccionada.emit(fecha);
  }

}
