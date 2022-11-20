import { FirestoreService } from 'src/app/servicios/firestore.service';
import { AuthService } from './../servicios/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

 esAdmin:boolean=false;
  constructor(private auth: AuthService, private firestore: FirestoreService)
  {
    this.firestore.obtenerUsuarios().subscribe(res=>{

      for (const usuario of res) {
        if(this.auth.usuario.uid==usuario.uid)
        {
          if(this.auth.usuario.perfil=='administrador')
          {
            this.esAdmin=true;
            break;
          }
        }
      }

    })

  }

  async canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean>
    {
    return this.esAdmin;
    }

}
