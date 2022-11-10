import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() perfil!: string;
  @Output() eventoRegistrar= new EventEmitter<boolean>();

  public formGroup!: FormGroup;
  public spinner: boolean;
  private correo:string;
  private pass:string;

  constructor(private form: FormBuilder,private auth: AuthService,private router:Router) {
    this.correo="";
    this.pass="";
    this.spinner=false;

   }

  ngOnInit(): void {
    this.formGroup=this.form.group({
      correo:['',[Validators.required,Validators.email]],
      pass:['', [Validators.required, Validators.minLength(6)]],
    });
  }

  iniciarSesion()
  {
    this.spinner=true;
    this.correo=this.formGroup.value.correo;
    this.pass=this.formGroup.value.pass;

    this.auth.loguear(this.correo,this.pass);
    setTimeout(() => {


      this.spinner=false;
    }, 2000);
  }

  irARegistro()
  {
    this.eventoRegistrar.emit(true);
  }

}
