import { Especialista } from './../../../../clases/usuario';
import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';
import { Fecha } from 'src/app/clases/fecha';
import { Paciente } from 'src/app/clases/usuario';
import { TurnoService } from './../../../../servicios/turnos.service';
import { Turno } from './../../../../interfaces/turno';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {


  @Input() porEstado: boolean=false;
  @Input() porHistoriaClinica: boolean=false;

  @Input() porFecha: boolean=false;
  @Input() paciente!: Paciente;
  @Input() especialista!: Especialista;

  @Output() eventoFechaSeleccionada=new EventEmitter<Fecha>();
  @Output() eventoHistoriaClinicaSeleccionada=new EventEmitter<Turno[]>();
  @Output() eventoEstadoSeleccionado= new EventEmitter<any>();

  public porDatoHistoriaClinica:boolean=false;
  public turnos: Turno[];
  public turnosPorDato: Turno[];
  public turnosFinalizados: Turno[];
  public datosDeHistoriaClinica: string[];


  constructor(private turnoService: TurnoService)
  {
    this.datosDeHistoriaClinica=['Peso','Altura','Presion','Temperatura'];
    this.turnosFinalizados=[];
    this.turnos=[];
    this.turnosPorDato=[];


  }

  ngOnInit(): void
  {
    this.turnoService.obtenerTurnos().subscribe((turnos)=>{
      this.turnos=turnos;

      if(this.porHistoriaClinica)
      {
        if(this.paciente)
        {
          this.turnosFinalizados=this.turnos.filter((turno)=>turno.uidPaciente==this.paciente.uid && turno.estado=='finalizado');
        }else if (this.especialista)
        {
          this.turnosFinalizados=this.turnos.filter((turno)=>turno.uidEspecialista==this.especialista.uid && turno.estado=='finalizado');
        }


        for (let item of this.turnosFinalizados)
        {


            if(!this.datosDeHistoriaClinica.includes(item.historiaClinica.datoDinamico1.clave))
            this.datosDeHistoriaClinica.push(item.historiaClinica.datoDinamico1.clave);

            if(!this.datosDeHistoriaClinica.includes(item.historiaClinica.datoDinamico2.clave))
            this.datosDeHistoriaClinica.push(item.historiaClinica.datoDinamico2.clave);

            if(!this.datosDeHistoriaClinica.includes(item.historiaClinica.datoDinamico3.clave))
            this.datosDeHistoriaClinica.push(item.historiaClinica.datoDinamico3.clave);



        }
      }
    });

  }
  estadoSeleccionado(estado: any)
  {
    this.eventoEstadoSeleccionado.emit(estado);
  }

  fechaSeleccionada(fecha: Fecha)
  {
    this.eventoFechaSeleccionada.emit(fecha);
  }

  elegirDato(dato: string)
  {


    if(dato!='Peso' && dato !='Presion'&&dato!='Temperatura' && dato!='Altura')
    {
      for (const item of this.turnosFinalizados)
      {
        if(item.historiaClinica.datoDinamico1.clave==dato || item.historiaClinica.datoDinamico2.clave==dato
          || item.historiaClinica.datoDinamico3.clave==dato)
        {
            this.turnosPorDato.push(item);
        }

      }
      this.eventoHistoriaClinicaSeleccionada.emit(this.turnosPorDato);

    }else
    {

     this.eventoHistoriaClinicaSeleccionada.emit(this.turnosFinalizados);
    }


  }

}
