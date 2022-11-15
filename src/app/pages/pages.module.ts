import { TurnosModule } from './home/turnos/turnos.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';




@NgModule({
  declarations: [
    BienvenidoComponent,
    MiPerfilComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LoginModule,
    HomeModule,
    TurnosModule

  ],
  exports:[BienvenidoComponent,MiPerfilComponent]
})
export class PagesModule { }
