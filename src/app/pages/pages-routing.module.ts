import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { LogGuard } from '../guards/log.guard';


const routes: Routes = [

{path:'', children:[{path:'bienvenido', component: BienvenidoComponent}]},
{path:'', children:[{path:'mi-perfil', component: MiPerfilComponent, canActivate:[LogGuard]}]},
{path: 'home', loadChildren: ()=> import('./home/home.module').then(m=>m.HomeModule)},
{path: 'login', loadChildren: ()=> import('./login/login.module').then(m=>m.LoginModule)},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
