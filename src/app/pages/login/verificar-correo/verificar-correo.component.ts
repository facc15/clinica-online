import { sendEmailVerification } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {

  public user:User|null;

  constructor(public auth: AuthService,private router: Router,private toastr: ToastrService) {
    this.user=this.auth.auth.currentUser;
   }

  ngOnInit(): void {
  }

  reenviar()
  {
    if(this.user)
    {
      sendEmailVerification(this.user);
      this.toastr.success('Se envió nuevamente el correo de verificación', 'Exito',{
        timeOut: 1000,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-center'
        });
        setTimeout(() => {
          this.router.navigateByUrl('pages/bienvenido');
        }, 1500);

    }

  }

  irABienvenido()
  {
    this.router.navigateByUrl('pages/bienvenido');
  }



}
