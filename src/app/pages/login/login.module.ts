import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from './../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';


@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    VerificarCorreoComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports:[RegistroComponent,LoginComponent],
})
export class LoginModule { }
