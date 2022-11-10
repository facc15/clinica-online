import { AuthService } from './../servicios/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private authF: AngularFireAuth)
  {

  }

  async canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean>
    {

      //this.authF.authState()

    return true;
    }

}
