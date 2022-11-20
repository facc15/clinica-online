import { PagesModule } from './../pages.module';
import { ComponentsModule } from './../../components/components.module';
import { FormsModule } from '@angular/forms';
import { TurnosModule } from './turnos/turnos.module';
import { LoginModule } from './../login/login.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { HomeRoutingModule } from './home-routing.module';
import { SeccionUsuariosComponent } from './seccion-usuarios/seccion-usuarios.component';
import { InformesComponent } from './informes/informes.component';


@NgModule({
  declarations: [
    HomeComponent,
    SeccionUsuariosComponent,
    InformesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LoginModule,
    TurnosModule,
    FormsModule,
    ComponentsModule,
    HighchartsChartModule,
  ],
  exports:[SeccionUsuariosComponent]
})
export class HomeModule { }
