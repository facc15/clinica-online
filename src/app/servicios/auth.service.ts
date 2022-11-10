import { Especialidades } from './../interfaces/especialidades';
import { FirestoreService } from './firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Especialista, Usuario } from '../clases/usuario';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, Auth, sendEmailVerification, UserInfo } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public esta: boolean;
  public especialidades: any[];
  public usuarioLog: any;
  public usuario: Usuario;
  public usuarios!: Usuario[];

  constructor(public auth:Auth,private router:Router, private toastr: ToastrService,private authF: AngularFireAuth,private firestore: FirestoreService) {
   this.esta=false;
   this.especialidades=[];
   this.usuario=new Usuario("","","",0,0,"","","","");

   this.getState().subscribe(res=>{
    this.usuarioLog=res;
   });

   this.firestore.obtenerUsuarios().subscribe((res)=>{
    this.usuarios=res;
    if(this.usuarioLog)
    {
      res.filter((usuario)=>{
        if(usuario.uid== this.usuarioLog.uid)
        this.usuario=usuario;
    });

    }

   });
   this.firestore.obtenerEspecialidades().subscribe((res:any[])=>{

    this.especialidades=res;

  });
  }

  async registrar(usuario: Usuario)
  {
      await createUserWithEmailAndPassword(this.auth, usuario.correo, usuario.pass).then(async (userCredential) => {
        const user = userCredential.user;
        console.log("registrado con exito->"+userCredential.user.email);
        this.toastr.success("El usuario se registró satisfactoriamente!!!","Éxito",{
          timeOut: 1000,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-center'
          });
          usuario.uid=user.uid;
          this.firestore.agregarColeccionUsuario(usuario);

          if(usuario.perfil=='especialista')
          {
            let especialista=<Especialista>usuario;


            for (let especialidad of this.especialidades)
            {
              for(let especialidad2 of especialista.especialidades)
              {

                if(especialidad2==especialidad.especialidad)
                {

                this.esta=true;
                break;
               }

              }
          }
          if(!this.esta)
          {
            this.firestore.agregarColeccionEspecialidad(especialista.especialidades[0]);

          }

          }


        sendEmailVerification(user).then(()=>{
          console.log('se envio mail');

          this.router.navigateByUrl('pages/verificar-correo');

        }).catch(error=>{
          console.log('error->'+error);
        });


        }).catch(async error => {
          console.log("error->"+error);
          this.toastr.error(this.firebaseError(error.code),'Error',{
            timeOut: 1200,
            progressAnimation: 'decreasing',
            positionClass: 'toast-top-center'});
          });




  }

  async loguear(correo:string,pass:string)
  {
    let sinVerificar=false;
    this.usuarios.filter((usu)=>{
      if(usu.correo==correo)
      {
        if(usu.perfil=='especialista')
        {
          let especialista=<Especialista> usu;

          if(!especialista.verificacionAdmin)
          {
            this.toastr.error("El administrador no verificó su cuenta",'Error',{
              timeOut: 1300,
              progressAnimation: 'decreasing',
              positionClass: 'toast-top-center'});

              sinVerificar=true;
          }
        }
      }
    });
    if(sinVerificar)
    {
      return;
    }

    await signInWithEmailAndPassword(this.auth,correo,pass).then(async (userCredential) => {
      const user = userCredential.user;

      if(!user.emailVerified)
      {
        this.router.navigateByUrl('pages/login/verificar-correo');
      }else
      {
        this.toastr.success("El usuario se logueó satisfactoriamente!!!","Éxito",{
          timeOut: 1000,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-center'
          });
        this.router.navigateByUrl('pages/home');
      }

      }).catch(async error => {
        console.log("error->"+error);
        this.toastr.error(this.firebaseError(error.code),'Error',{
          timeOut: 1300,
          progressAnimation: 'decreasing',
          positionClass: 'toast-top-center'});
        });


  }



  getState()
  {
    return this.authF.authState;
  }

  firebaseError(code: string)
  {
    switch(code)
    {
        case 'auth/email-already-in-use':
          return 'El usuario ya se encuentra registrado';
        case 'auth/weak-password':
          return 'La contraseña debe ser de mí­nimo 6 caracteres';
        case 'auth/invalid-email':
          return 'El correo es inválido';
        case 'auth/wrong-password':
        return 'La contraseña es incorrecta';
        case 'auth/user-not-found':
          return 'El usuario no se encuentra registado';
        default:
          return 'Error desconocido';

    }

  }


  async desloguear(){
    const auth = getAuth();
    try{

      await signOut(auth);
    }catch(error){
          console.log(error);
    }

  }




}
