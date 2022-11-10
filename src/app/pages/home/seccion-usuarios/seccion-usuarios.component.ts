import { ExcelService } from './../../../servicios/excel.service';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Especialista, Administrador,Paciente } from 'src/app/clases/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../clases/usuario';
import { getDownloadURL } from '@angular/fire/storage';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent implements OnInit {

  public listaUsuarios: Usuario[]|null=null;
  public listaEspecialistas: Especialista[];
  public registrarAdmin: boolean;
  public perfil: string="administrador";
  public registrado: boolean;
  public tabla: any;
  public administrador!: Administrador;
  public paciente!: Paciente;

  public verHistoriaClinica: boolean=false;

  constructor(private auth: AuthService,private firestore: FirestoreService,private router: Router,private excel: ExcelService)
  {
    this.listaEspecialistas=[];
    this.registrarAdmin=false;
    this.registrado=false;
  }

  ngOnInit() {

    this.firestore.obtenerUsuarios().subscribe(res=>{
      this.listaUsuarios=res;

        this.listaEspecialistas=<Especialista[]>this.listaUsuarios.filter(usu=> usu.perfil=='especialista' && !(<Especialista>usu).verificacionAdmin);

      for (let index = 0; index < this.listaUsuarios.length; index++)
      {

        this.firestore.traerFotos().then( async response=>{
          for(let item2 of response.items)
          {
            const url=await getDownloadURL(item2);

            if(this.listaUsuarios)
            {

              if(this.listaUsuarios[index].pathPerfil==item2.name)
              {
                this.listaUsuarios[index].pathPerfil=url;
              }

              if(this.listaUsuarios[index].perfil=='especialista')
              {
                let especialista =<Especialista>this.listaUsuarios[index];

                if(!especialista.verificacionAdmin)
                {
                  this.listaUsuarios= this.listaUsuarios.filter((usu)=>usu.uid!=especialista.uid);
                }
              }
            }

          }

          }).catch(error=>{console.log(error);});
      }



    });

  }

  irAHistoriaClinica(usuario: Usuario)
  {
    this.paciente=<Paciente>usuario;
    this.verHistoriaClinica=true;
  }

  volver()
  {
    this.verHistoriaClinica=false;
  }

  descargarEnExcel()
  {
    this.tabla= document.getElementById('tabla');


    const excel: XLSX.WorkSheet= XLSX.utils.table_to_sheet(this.tabla);

    const libro: XLSX.WorkBook= XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(libro,excel,'Sheet1');

    XLSX.writeFile(libro,'Usuarios.xlsx');
  }


  habilitarEspecialista(especialista: Especialista)
  {
    especialista.verificacionAdmin=true;
    this.listaEspecialistas=this.listaEspecialistas?.filter(sinVerificar=>!sinVerificar.verificacionAdmin );
    this.firestore.actualizarEspecialista(especialista)
    .then(res=>console.log(res))
    .catch(error=>console.log(error));
  }

  irARegistro()
  {
    this.registrarAdmin=true;
  }

  adminRegistrado(event: boolean)
  {
    this.registrarAdmin=false;
    this.registrado=event;
  }



}
