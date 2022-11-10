import { AuthService } from 'src/app/servicios/auth.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  public loguear:boolean=false;
  public registrar:boolean=false;
  public perfil: string;
  constructor(private router: Router,private toastr: ToastrService, private auth: AuthService) {


    this.perfil="";
   }

  ngOnInit(): void {
    this.auth.getState().subscribe(res=>{
      if(!res)
      {
        this.router.navigateByUrl('pages/home');
      }
    })
  }

  log(valor: string)
  {
    this.loguear=true;
    this.perfil=valor;
  }

  irARegistrar(event: boolean)
  {
  this.registrar=event;
  this.loguear=false;
  }


  irALoguear(event: boolean)
  {
  this.registrar=false;
  this.loguear=event;
  }

  accesoRapido(clave: string, valor: string)
  {
    this.auth.loguear(clave,valor);

  }

  volver()
  {
    this.loguear=false;
    this.registrar=false;
  }
}
