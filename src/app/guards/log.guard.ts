import { User, UserInfo } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogGuard implements CanActivate, CanDeactivate<unknown> {

  private user!: UserInfo|null;


  constructor(private auth:AuthService)
  {


  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      const user = await this.auth.auth.currentUser;

      if(user)
      {
        if(user.emailVerified)
        return true;
      }

      return false;

  }



   canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean
    {


      if(this.user)
      {
        alert('no te dejo salir');
        console.log(this.user);
        return false;
      }else
      {
        alert('te dejo salir');
        return true;
      }

    }

}
