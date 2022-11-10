import { PagesModule } from './../pages.module';
import { ComponentsModule } from './../../components/components.module';
import { FormsModule } from '@angular/forms';
import { TurnosModule } from './turnos/turnos.module';
import { LoginModule } from './../login/login.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SeccionUsuariosComponent } from './seccion-usuarios/seccion-usuarios.component';


@NgModule({
  declarations: [
    HomeComponent,
    SeccionUsuariosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LoginModule,
    TurnosModule,
    FormsModule,
    ComponentsModule,
  ],
  exports:[SeccionUsuariosComponent]
})
export class HomeModule { }
