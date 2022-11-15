import { Paciente } from 'src/app/clases/usuario';
import { FirestoreService } from './../../servicios/firestore.service';
import { Usuario } from './../../clases/usuario';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { UserInfo } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { getDownloadURL } from '@angular/fire/storage';
import { trigger ,style, state, transition, animate} from '@angular/animations';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('animacionSide',[
      state('void',style({
        transform: 'translateY(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(3000,style({
          transform:'translateY(0)',
          opacity:1,
        }))
      ]),
    ]),
    trigger('animacionBienvenido',[
      state('void',style({
        transform: 'translateY(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(2000,style({
          transform:'translateY(0)',
          opacity:1,
        }))
      ]),
    ]),
    trigger('animacionTitulo',[
      state('void',style({
        transform: 'translateY(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(1000,style({
          transform:'translateY(0)',
          opacity:1,
        }))
      ]),
    ])

  ]
})
export class HomeComponent implements OnInit {



  public user:UserInfo|null=null;

  public usuarios!: Observable<Usuario[]>;
  public esAdmin: boolean=false;
  public nombre:string|null=null;
  public apellido:string ="";
  public perfil: string="";
  public foto:string|null=null;
  public fotos: string[];
  public usuarioLog!: Usuario;
  public paciente!: Paciente;

  public animacion: string="inactiva";

  public seccionUsuarios: boolean;
  public seccionSolicitarTurno:boolean;
  public elegirPaciente: boolean=false;
  public verHistoria: boolean=false;


  constructor(public auth: AuthService, private router: Router, private toastr: ToastrService,private firestore: FirestoreService)
  {
    this.fotos=[];
    this.seccionUsuarios=false;
    this.seccionSolicitarTurno=false;
  }

  async ngOnInit() {
    this.usuarios= await this.firestore.obtenerUsuarios();

    const user= await this.auth.getState();



        this.usuarios.subscribe(res=>{

          for(let item of res)
          {
            if(!this.auth.usuarioLog)
              {
                this.router.navigateByUrl('pages/bienvenido');
              }

            if(item.uid==this.auth.usuarioLog.uid)
            {
              if(item.perfil=='especialista' && !this.auth.usuarioLog.emailVerified)
              {
                this.router.navigateByUrl('pages/login/verificar-correo');
              }
              this.usuarioLog=item;
              this.apellido=item.apellido;
              this.nombre=item.nombre;
              this.perfil=item.perfil;

              this.firestore.traerFotos().then( async response=>{
                for(let item2 of response.items)
                {
                  const url=await getDownloadURL(item2);

                  if(item.pathPerfil==item2.name)
                  {
                    this.foto=url;
                  }
                }

                })
                .catch(error=>{console.log(error);});

            }
          }
        });




  }

  verHistoriaClinica(paciente: Paciente)
  {
    this.paciente=paciente;
    this.verHistoria=true;
    this.elegirPaciente=false;
    this.animacion='activa';
  }

  volver()
  {
    this.verHistoria=false;
  }
  irAElegirPaciente()
  {
    this.elegirPaciente=true;
  }

  irATurnos()
  {
    this.router.navigateByUrl('pages/home/mis-turnos');
  }

  irASolicitarTurno()
  {
    this.router.navigateByUrl('pages/home/turnos/sacar-turno');
  }

  irAUsuarios()
  {
    this.seccionUsuarios=true;
  }

  irAMiPerfil()
  {
    this.animacion='activa';
    this.router.navigateByUrl('pages/mi-perfil');
  }

  cerrarSesion()
  {
    this.auth.desloguear().then(()=>{
      this.toastr.success('Se cerró sesión satisfactoriamente', 'Exito',{
        timeOut: 1400,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-center'
        });
      setTimeout(() => {

        this.router.navigateByUrl('pages/bienvenido');
      }, 1800);

    });
  }


}
