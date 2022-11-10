import { VerHistoriaClinicaComponent } from './ver-historia-clinica/ver-historia-clinica.component';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { LogGuard } from 'src/app/guards/log.guard';

const routes: Routes = [
  {path:'', children:[{path:'sacar-turno', component: SacarTurnoComponent, canActivate:[LogGuard]}]},
  {path:'', children:[{path:'ver-historia-clinica', component: VerHistoriaClinicaComponent, canActivate:[LogGuard]}]},
  {path:'', children:[{path:'mis-turnos', component: MisTurnosComponent, canActivate:[LogGuard]}]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
