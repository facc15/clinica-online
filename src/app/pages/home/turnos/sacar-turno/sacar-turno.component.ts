import { Especialidades } from 'src/app/interfaces/especialidades';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { AuthService } from './../../../../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TurnoService } from 'src/app/servicios/turnos.service';
import { Turno } from 'src/app/interfaces/turno';
import { Usuario, Especialista, Paciente } from 'src/app/clases/usuario';
import { Component, Input, OnInit } from '@angular/core';
import { Fecha } from 'src/app/clases/fecha';
import { getDownloadURL } from '@angular/fire/storage';
import { style,state, transition, trigger, animate } from '@angular/animations';

@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css'],
  animations:[
    trigger('animacionBotones',[
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
    trigger('animacionOpacityBotones',[
      state('void',style({
        opacity:0
      })),
      transition(':enter',[
        animate(2000,style({
          opacity:1,
        }))
      ]),
    ]),
  ]
})
export class SacarTurnoComponent implements OnInit {


  public miUsuario: Usuario;
  public spinner:boolean=false;
  public porEspecialidad: boolean=true;
  public porEspecialista: boolean=false;
  public porPaciente: boolean=false;
  public elegirDia: boolean=false;
  public elegirHorario: boolean=false;

  public especialidadSeleccionada: any;
  public especialistaSeleccionado!: Especialista;

  public listaEspecialistas: Especialista[];
  public listaEspecialistasFiltrados: Especialista[];

  public fechas!: Fecha[];
  public fechasEspecialista!: Fecha[];
  public horasDisponibles: string[];

  public pacienteSeleccionado!: Paciente;
  public fechaSeleccionada!: Fecha;
  public horarioSeleccionado!: string;
  public especialidades!: Especialidades[];
  public especialidad!: Especialidades;
  public pathEspecialidades: string[];




  public turno ={paciente:{},especialista:{},fecha:{},estado:{},uidEspecialista:{},uidPaciente:{},especialidad:{}} as Turno;

  constructor(public auth:AuthService, private turnoService: TurnoService,private router: Router,private toastr: ToastrService,private firestore: FirestoreService) {
   this.miUsuario=new Usuario("","","",0,0,"","","","");
   this.pathEspecialidades=[];
   this.especialidades=new Array();
   this.especialidad= {uid:{},especialidad:{},pathEspecialidad:{}} as Especialidades;
   this.listaEspecialistas=[];
   this.listaEspecialistasFiltrados=[];
   this.fechasEspecialista=[];
   this.horasDisponibles=[];

  }

  ngOnInit(): void
  {
      this.auth.getState().subscribe((res)=>{
        this.miUsuario=this.auth.usuario;
  });


  for (let index = 0; index < this.auth.especialidades.length; index++)
  {

    try {
      this.firestore.traerFotosEspecialidades().then( async response=>{
        for(let item of response.items)
        {
          const url=await getDownloadURL(item);
          const especialidad=item.name.split('.');

            if(this.auth.especialidades[index].especialidad==especialidad[0])
            this.auth.especialidades[index].pathEspecialidad=url;

        }

        }).catch(error=>{console.log(error);});

    } catch (error)
    {

    }

  }
  const lista=Array();
  this.firestore.obtenerEspecialistas().then((res)=>{
    res.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());

      lista.push(doc.data());
      this.listaEspecialistas=<Especialista[]>lista;
    });

    for (let index = 0; index < this.listaEspecialistas.length; index++)
      {

        this.firestore.traerFotos().then( async response=>{
          for(let item2 of response.items)
          {
            const url=await getDownloadURL(item2);


              if(this.listaEspecialistas[index].pathPerfil==item2.name)
              {
                this.listaEspecialistas[index].pathPerfil=url;
              }
          }});
        }

  });

  this.fechas= this.turnoService.traerFechas();
  }


  seleccionaEspecialidad(especialidad: Especialidades)
  {
    this.especialidadSeleccionada=especialidad;
    this.porEspecialidad=false;
    this.porEspecialista=true;

    this.listaEspecialistas.filter((especialista:any)=>{
      for(let esp of especialista.especialidades)
      {
        if(esp==especialidad.especialidad)
        {
          this.listaEspecialistasFiltrados.push(especialista);
          break;
        }
      }
    });

  }

  seleccionarEspecialista(especialista: Especialista)
  {
    this.especialistaSeleccionado=especialista;
    this.porEspecialista=false;


    this.fechasEspecialista=this.turnoService.fechasDisponibles(especialista);

    if(this.miUsuario.perfil=='administrador')
    {
      this.porPaciente=true;
      this.porEspecialidad=false;
    }else
    {
      this.porEspecialidad=false;
      this.elegirDia=true;
    }

  }

  seleccionarFecha(fecha: Fecha)
  {
    this.fechaSeleccionada=fecha;
    this.horasDisponibles=fecha.horas;
    this.elegirDia=false;
    this.elegirHorario=true;
  }

  seleccionarHorario(hora: string)
  {
    this.elegirHorario=false;
    this.horarioSeleccionado=hora;
    this.solicitarTurno();
  }


  seleccionarPaciente(paciente: Paciente)
  {
    this.porPaciente=false;
    this.pacienteSeleccionado=paciente;

    this.elegirDia=true;
  }





  solicitarTurno()
  {
    this.spinner=true;
    this.elegirHorario=false;

    this.turno.estado="pendiente";
    this.turno.especialidad=this.especialidadSeleccionada;
    this.turno.especialista=this.especialistaSeleccionado.nombre+" "+this.especialistaSeleccionado.apellido;
    this.turno.uidEspecialista=this.especialistaSeleccionado.uid;

    if(this.miUsuario.perfil=='administrador')
    {
      this.turno.paciente= this.pacienteSeleccionado.nombre+" "+this.pacienteSeleccionado.apellido;
      this.turno.uidPaciente=this.pacienteSeleccionado.uid;
    }else
    {
      this.turno.paciente=this.miUsuario.nombre+" "+this.miUsuario.apellido;
      this.turno.uidPaciente=this.miUsuario.uid;
    }

    this.turno.fecha.hora=this.horarioSeleccionado;
    this.turno.fecha.dia=this.fechaSeleccionada.dia;
    this.turno.fecha.diaNumero=this.fechaSeleccionada.diaNumero;
    this.turno.fecha.mes=this.fechaSeleccionada.mes;
    this.turno.fecha.mesNumero=this.fechaSeleccionada.mesNumero;



   this.turnoService.agregarTurno(this.turno).then(res=>{
    this.toastr.success("Se solicitó el turno correctamente!!!",'Exito',{
      timeOut: 1500,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-center'});

    setTimeout(() => {
    this.router.navigateByUrl('pages/home');
    this.spinner=false;
}, 1500);
  }).catch(()=>this.spinner=false);

  }

}
