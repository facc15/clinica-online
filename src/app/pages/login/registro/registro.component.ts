import { Especialidades } from './../../../interfaces/especialidades';
import { FirestoreService } from './../../../servicios/firestore.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Paciente, Especialista, Usuario, Administrador } from './../../../clases/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @Input() perfil!: string;
  @Output() eventoLogin= new EventEmitter<boolean>();
  @Output() eventoRegistroAdmin= new EventEmitter<boolean>();

  public spinner: boolean=false;
  public formGroup!: FormGroup;
  public paciente: Paciente;
  public especialista: Especialista;
  public administrador: Administrador;
  public obra: string;
  public especialidades: any[];
  public especialidadAgregar: boolean=false;
  public especialidadElegida: boolean=false;
  public captcha: boolean=false;

  public file: any;

  public obrasSociales=['Elsieland','LaCasona','ClubXXI','Levento','Traxx','LaZona','Otra'];

  constructor(private toastr: ToastrService,public form: FormBuilder, private auth: AuthService,private router: Router,public firestore: FirestoreService)
  {
    this.paciente=new Paciente("","","",0,0,"","","","","");
    this.especialista=new Especialista("","","",0,0,"","","","");
    this.administrador=new Administrador("","","",0,0,"","","","");
    this.obra="";
    this.especialidades=[];


   }

   ngOnInit(): void {


    if(this.perfil=='paciente')
    {
      console.log(this.perfil);
      this.formGroup=this.form.group({
        nombre:['', [Validators.required]],
        apellido:['',[Validators.required]],
        edad:['', [Validators.required, Validators.min(18),Validators.max(99)]],
        dni:['', [Validators.required, Validators.min(1000000),Validators.max(99999999)]],
        correo:['',[Validators.required,Validators.email]],
        pass:['', [Validators.required, Validators.minLength(6)]],
        pass2:['', [Validators.required, Validators.minLength(6)]],

      });
    }else if(this.perfil=='especialista')
    {
      this.firestore.obtenerEspecialidades().subscribe((res:any[])=>{
        this.especialidades=res;

      });

      this.formGroup=this.form.group({
        nombre:['', Validators.required],
        apellido:['',Validators.required],
        edad:['', [Validators.required, Validators.min(18),Validators.max(99)]],
        dni:['', [Validators.required, Validators.min(1000000),Validators.max(99999999)]],
        especialidad:[''],
        correo:['',[Validators.required,Validators.email]],
        pass:['', [Validators.required, Validators.minLength(6)]],
        pass2:['', [Validators.required, Validators.minLength(6)]]
      });

    }else if(this.perfil=='administrador')
    {
      this.formGroup=this.form.group({
        nombre:['', Validators.required],
        apellido:['',Validators.required],
        edad:['', [Validators.required, Validators.min(18),Validators.max(99)]],
        dni:['', [Validators.required, Validators.min(1000000),Validators.max(99999999)]],
        correo:['',[Validators.required,Validators.email]],
        pass:['', [Validators.required, Validators.minLength(6)]],
        pass2:['', [Validators.required, Validators.minLength(6)]],
        pathPerfil:['', [Validators.required]],
      });

    }

  }

  agregarEspecialidad()
  {
    this.especialidadAgregar=true;
  }

  elegirEspecialidad()
  {
    this.especialidadAgregar=false;
  }

   capturarSeleccion(event: any){
    this.obra=event.target.value;
    }

    capturarEspecialidad(event:any)
    {
      const especialidad = event.target.value;

      this.especialista.especialidades=[];
      if(this.especialista.especialidades.length==0)
      this.especialista.especialidades.push(<Especialidades>especialidad);

    }

    captchaCorrecto(event: boolean)
    {
      this.captcha=event;
    }

    chequearCaptcha()
    {
      if(this.captcha)
      {
        this.generarRegistro();
      }
      else
      {
        this.toastr.error("Debe resolver el Captcha","Error",{
          timeOut: 2000,
          progressAnimation: 'decreasing',
          positionClass: 'toast-top-center'
          });
      }
    }

    generarRegistro()
    {
      this.spinner=true;

      if(this.formGroup.value.pass!=this.formGroup.value.pass2)
      {
        this.toastr.error("Las contraseñas deben ser iguales","Error",{
        timeOut: 2000,
        progressAnimation: 'decreasing',
        positionClass: 'toast-top-center'
        });
        this.spinner=false;
      return;
      }
      if(!this.firestore.file)
      {
        this.toastr.error("No se seleccionó foto","Error",{
          timeOut: 2000,
          progressAnimation: 'decreasing',
          positionClass: 'toast-top-center'
          });
          this.spinner=false;
        return;
      }

      if(this.perfil=='paciente')
      {

        if(!this.obra)
        {this.toastr.error("No se seleccionó obra social","Error",{
          timeOut: 2000,
          progressAnimation: 'decreasing',
          positionClass: 'toast-top-center'
          });
          this.spinner=false;
          return;
        }
        if(!this.firestore.file2)
      {
        this.toastr.error("No se seleccionó segunda foto","Error",{
          timeOut: 2000,
          progressAnimation: 'decreasing',
          positionClass: 'toast-top-center'
          });
          this.spinner=false;
        return;
      }

      this.paciente.nombre=this.formGroup.value.nombre;
      this.paciente.apellido=this.formGroup.value.apellido;
      this.paciente.dni=this.formGroup.value.dni;
      this.paciente.edad=this.formGroup.value.edad;
      this.paciente.obraSocial=this.obra;
      this.paciente.pathPerfil= this.paciente.apellido+this.paciente.nombre;
      this.paciente.pathPerfil2=this.paciente.apellido+this.paciente.nombre+2;
      this.paciente.correo=this.formGroup.value.correo;
      this.paciente.pass=this.formGroup.value.pass;
      this.paciente.perfil=this.perfil;

      setTimeout(() => {

       this.registrar(this.paciente);
      }, 600);

      }else if(this.perfil=='especialista')
      {

        if(this.especialidadAgregar)
        {
          this.especialista.especialidades=[];
          this.especialista.especialidades.push(<Especialidades>this.formGroup.value.especialidad);
        }

        if(this.especialista.especialidades.length==0)
        {
          this.toastr.error("No se seleccionó especialidad","Error",{
            timeOut: 2000,
            progressAnimation: 'decreasing',
            positionClass: 'toast-top-center'
            });
            this.spinner=false;
          return;
        }

      this.especialista.nombre=this.formGroup.value.nombre;
      this.especialista.apellido=this.formGroup.value.apellido;
      this.especialista.edad=this.formGroup.value.edad;
      this.especialista.dni=this.formGroup.value.dni;
      this.especialista.pathPerfil=this.especialista.apellido+this.especialista.nombre;
      this.especialista.correo=this.formGroup.value.correo;
      this.especialista.pass=this.formGroup.value.pass;
      this.especialista.perfil=this.perfil;

      setTimeout(() => {
        this.registrar(this.especialista);
      }, 600);

      }else if(this.perfil=='administrador')
      {
      this.administrador.nombre=this.formGroup.value.nombre;
      this.administrador.apellido=this.formGroup.value.apellido;
      this.administrador.edad=this.formGroup.value.edad;
      this.administrador.dni=this.formGroup.value.dni;
      this.administrador.pathPerfil=this.administrador.apellido+this.administrador.nombre;
      this.administrador.correo=this.formGroup.value.correo;
      this.administrador.pass=this.formGroup.value.pass;
      this.administrador.perfil=this.perfil;
      setTimeout(() => {
        this.registrar(this.administrador);
        this.eventoRegistroAdmin.emit(true);
      }, 600);

      }

      setTimeout(() => {
        this.spinner=false;
      }, 2500);
  }


   registrar(usuario: Usuario)
   {
    this.auth.registrar(usuario);
    }


  seleccionarImagen($event :any)
  {
    this.firestore.file= $event.target.files[0];
  }

  seleccionarImagen2($event :any)
  {
    this.firestore.file2= $event.target.files[0];
  }





  irALogin()
  {
    this.eventoLogin.emit(true);
  }

}
