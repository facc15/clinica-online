import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';
import { RegistroComponent } from '../login/registro/registro.component';
import { LoginComponent } from '../login/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', children:[{path:'registro', component: RegistroComponent}]},
  {path:'', children:[{path:'login', component: LoginComponent}]},
  {path:'', children:[{path:'verificar-correo', component: VerificarCorreoComponent}]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
