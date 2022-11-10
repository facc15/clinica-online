import { AdminGuard } from './../../guards/admin.guard';
import { SeccionUsuariosComponent } from './seccion-usuarios/seccion-usuarios.component';
import { LogGuard } from './../../guards/log.guard';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path:'', children:[{path:'', component: HomeComponent, canActivate:[LogGuard]}]},
  {path:'', children:[{path:'seccion-usuarios', component: SeccionUsuariosComponent, canActivate:[LogGuard]}]},
  {path: 'turnos', loadChildren: ()=> import('./turnos/turnos.module').then(m=>m.TurnosModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
