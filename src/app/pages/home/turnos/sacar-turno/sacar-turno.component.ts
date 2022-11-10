import { AuthService } from './../../../../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TurnoService } from 'src/app/servicios/turnos.service';
import { Turno } from 'src/app/interfaces/turno';
import { Usuario } from 'src/app/clases/usuario';
import { Component, Input, OnInit } from '@angular/core';
import { Fecha } from 'src/app/clases/fecha';
import { Especialista, Paciente } from 'src/app/clases/usuario';

@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {


  public miUsuario: Usuario;
  public spinner:boolean=false;
  public porEspecialidad: boolean=false;
  public porEspecialista: boolean=false;
  public porPaciente: boolean=false;
  public elegirDia: boolean=false;
  public elegirHorario: boolean=false;

  public especialidadSeleccionada: any;
  public especialistaSeleccionado!: Especialista;
  public pacienteSeleccionado!: Paciente;
  public fechaSeleccionada!: Fecha;
  public horarioSeleccionado!: string;



  public turno ={paciente:{},especialista:{},fecha:{},estado:{},uidEspecialista:{},uidPaciente:{},especialidad:{}} as Turno;

  constructor(private auth:AuthService, private turnoService: TurnoService,private router: Router,private toastr: ToastrService) {
   this.miUsuario=new Usuario("","","",0,0,"","","","");
  }

  ngOnInit(): void {
      this.auth.getState().subscribe((res)=>{
        this.miUsuario=this.auth.usuario;
      })
  }

  buscarPorEspecialista()
  {
    this.porEspecialista=true;
  }

  buscarPorEspecialidad()
  {
    this.porEspecialidad=true;
  }

  seleccionarEspecialista(event: any)
  {
    this.porEspecialidad=false;
    this.porEspecialista=true;
    this.especialidadSeleccionada=event;

      if(this.especialistaSeleccionado && this.especialidadSeleccionada)
      {
        if(this.miUsuario.perfil=='administrador')
        {
          this.porPaciente=true;
          this.porEspecialista=false;
        }else
        {
          this.porEspecialista=false;
          this.elegirDia=true;
        }

      }

  }

  seleccionarPaciente(paciente: Paciente)
  {
    this.porPaciente=false;
    this.pacienteSeleccionado=paciente;

    this.elegirDia=true;
  }

  seleccionarEspecialidad(event: Especialista)
  {
    this.especialistaSeleccionado=event;
    this.porEspecialidad=true;
    this.porEspecialista=false;

    if(this.especialistaSeleccionado && this.especialidadSeleccionada)
    {
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
  }

  seleccionarHorario(event: Fecha)
  {
    this.elegirDia=false;
    this.elegirHorario=true;
    this.fechaSeleccionada=event;
  }

  solicitarTurno(event : string)
  {
    this.spinner=true;
    this.elegirHorario=false;

    this.horarioSeleccionado=event;

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
