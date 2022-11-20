import { ComponentsModule } from './../../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { TablaFechasComponent } from './tabla-fechas/tabla-fechas.component';
import { TablaEspecialidadComponent } from './tabla-especialidad/tabla-especialidad.component';
import { TablaEspecialistasComponent } from './tabla-especialistas/tabla-especialistas.component';
import { TablaHorariosComponent } from './tabla-horarios/tabla-horarios.component';
import { TurnosPacientePipe } from 'src/app/pipes/turnos-paciente.pipe';
import { TurnosEspecialidadComponent } from './turnos-especialidad/turnos-especialidad.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';

import { FiltroEspecialistasPipe } from 'src/app/pipes/filtro-especialistas.pipe';
import { FiltroEspecialidadesPacientePipe } from 'src/app/pipes/filtro-especialidades-paciente.pipe';
import { VerReseniaComponent } from './ver-resenia/ver-resenia.component';
import { TablaPacientesComponent } from './tabla-pacientes/tabla-pacientes.component';

import { FiltroPacientesPipe } from 'src/app/pipes/filtro-pacientes.pipe';
import { FiltroEspecialidadesEspecialistaPipe } from 'src/app/pipes/filtro-especialidades-especialista.pipe';
import { TurnosEspecialistaPipe } from 'src/app/pipes/turnos-especialista.pipe';
import { FiltroEspecialidadesAdministradorPipe } from 'src/app/pipes/filtro-especialidades-administrador.pipe';
import { FiltroEspecialistasAdministradorPipe } from 'src/app/pipes/filtro-especialistas-administrador.pipe';
import { FiltroPacientesEspecialistaPipe } from 'src/app/pipes/filtro-pacientes-especialista.pipe';
import { TurnosEstadoPipe } from 'src/app/pipes/turnos-estado.pipe';
import { TurnosFechaRepetidaPipe } from 'src/app/pipes/turnos-fecha-repetida.pipe';
import { TurnosEspecialistaPacienteOrdenadoPipe } from 'src/app/pipes/turnos-especialista-paciente-ordenado.pipe';
import { TurnosPacienteRepetidoPipe } from 'src/app/pipes/turnos-paciente-repetido.pipe';

import { ModificarTurnoComponent } from './modificar-turno/modificar-turno.component';
import { CompletarEncuestaComponent } from './completar-encuesta/completar-encuesta.component';
import { CalificarAtencionComponent } from './calificar-atencion/calificar-atencion.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { VerHistoriaClinicaComponent } from './ver-historia-clinica/ver-historia-clinica.component';
import { TablaTurnosComponent } from './tabla-turnos/tabla-turnos.component';
import { CardsPacientesComponent } from './cards-pacientes/cards-pacientes.component';


@NgModule({
  declarations: [
    SacarTurnoComponent,
    MisTurnosComponent,
    TablaFechasComponent,
    TablaEspecialidadComponent,
    TablaEspecialistasComponent,
    TablaHorariosComponent,
    TurnosPacientePipe,
    TurnosEspecialidadComponent,
    TurnosEspecialistaComponent,
    TurnosPacienteComponent,
    FiltroEspecialistasPipe,
    FiltroEspecialidadesPacientePipe,
    VerReseniaComponent,
    TablaPacientesComponent,
    FiltroPacientesPipe,
    FiltroEspecialidadesEspecialistaPipe,
    FiltroEspecialidadesAdministradorPipe,
    FiltroEspecialistasAdministradorPipe,
    TurnosEspecialistaPipe,
    TurnosEspecialistaPacienteOrdenadoPipe,
    TurnosPacienteRepetidoPipe,
    ModificarTurnoComponent,
    CompletarEncuestaComponent,
    CalificarAtencionComponent,
    HistoriaClinicaComponent,
    VerHistoriaClinicaComponent,
    FiltroPacientesEspecialistaPipe,
    TurnosFechaRepetidaPipe,
    TurnosEstadoPipe,
    TablaTurnosComponent,
    CardsPacientesComponent

  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule
  ],
  exports:[MisTurnosComponent,SacarTurnoComponent,VerHistoriaClinicaComponent,TablaPacientesComponent,CardsPacientesComponent,FiltroEspecialidadesPacientePipe]
})
export class TurnosModule { }
