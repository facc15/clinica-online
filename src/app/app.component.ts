import { Usuario } from './clases/usuario';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { FirestoreService } from './servicios/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinica';
  usuarios!: Usuario[];
  usuario!: Usuario;

  constructor(private router: Router,private auth:AuthService, private firestore: FirestoreService)
  {

    this.auth.getState().subscribe(res=>{


        if(res)
        {
        if(!res.emailVerified)
        this.router.navigateByUrl('pages/login/verificar-correo');
        else
        this.router.navigateByUrl('pages/home');

        }else
        {
        this.router.navigateByUrl('pages/bienvenido');
        }


      });



  }
}
