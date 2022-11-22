import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';
import { Router, TitleStrategy } from '@angular/router';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { Especialista, Paciente } from './../../../../clases/usuario';
import { Fecha } from 'src/app/clases/fecha';
import { format } from 'date-fns';
import { Usuario } from 'src/app/clases/usuario';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { TurnoService } from 'src/app/servicios/turnos.service';
import { Turno } from 'src/app/interfaces/turno';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  @Input() miUsuario!: Usuario;

  spinner: boolean=false;
  turnos : Turno[];
  usuarioLog!: Usuario;
  especialista!: Especialista;
  paciente!: Paciente;
  especialidad!: Especialidades;
  especialistasPorPaciente!: Especialista[];
  fecha: Fecha;
  historiaClinica!: HistoriaClinica;

  porEspecialidad: boolean=false;
  porEspecialista: boolean=false;
  porPaciente: boolean=false;
  porFecha: boolean=false;
  porEstado:boolean=false;
  porHistoriaClinica: boolean=false;

  estado:any;
  mostrarTurnosPorEstado:boolean=false;
  mostrarTurnosPorEspecialista:boolean=false;
  mostrarTurnosPorEspecialidad:boolean=false;
  mostrarTurnosPorPaciente:boolean=false;
  mostrarTurnosPorHistoriaClinica:boolean=false;
  mostrarTurnosPorFecha:boolean=false;

  fechas: Fecha[];


  constructor(public auth : AuthService, private turnoService : TurnoService,
    private toastr : ToastrService,private router: Router) {
      this.turnos=[];
      this.miUsuario=new Usuario("","","",0,0,"","","","");

    this.turnoService.obtenerTurnos().subscribe(value =>
    {
        this.turnos = value;
    });

    this.fechas=[];

    this.fecha=new Fecha("","","");

   }


  ngOnInit(): void {

      this.fechas=this.turnoService.traerFechas();

      if(this.auth.usuario.perfil=='paciente')
      {
        this.paciente=<Paciente>this.auth.usuario;
      }else if(this.auth.usuario.perfil=='especialista')
      {
        this.especialista=<Especialista>this.auth.usuario;
      }
  }

  buscar(elegido: any)
  {

      const valor=elegido.target.value;
      switch (valor) {
        case 'especialista': this.buscarPorEspecialista();
          break;
        case 'especialidad': this.buscarPorEspecialidad();
          break;
        case 'fecha': this.buscarPorFecha();
          break;
        case 'estado': this.buscarPorEstado();
        break;
        case 'historia': this.buscarPorHistoriaClinica();
        break;
        case 'paciente': this.buscarPorPaciente();
        break;
        default:
          break;
      }


  }

  buscarPorEstado()
  {
    this.resetear();
    this.porEstado=true;


  }

  estadoSeleccionado(estado: any)
  {
    this.resetear();
    this.estado=estado;
    this.mostrarTurnosPorEstado=true;


  }

  buscarPorHistoriaClinica()
  {
    this.resetear();
    this.porHistoriaClinica=true;

  }

  resetear()
  {
    this.mostrarTurnosPorEspecialista=false;
    this.mostrarTurnosPorEspecialidad=false;
    this.mostrarTurnosPorPaciente=false;
    this.mostrarTurnosPorHistoriaClinica=false;
    this.mostrarTurnosPorFecha=false;
    this.mostrarTurnosPorEstado=false;
    this.porEspecialidad=false;
    this.porEspecialista=false;
    this.porFecha=false;
    this.porPaciente=false;
    this.porFecha=false;
    this.porHistoriaClinica=false;
    this.porEstado=false;
  }

  buscarPorFecha()
  {
    this.resetear();
    this.porFecha=true;
  }

  turnoPorHistoriaClinicaSeleccionada(turnos:Turno[])
  {
    this.resetear();
    this.turnos=turnos;
    this.mostrarTurnosPorHistoriaClinica=true;

  }


  fechaSeleccionada(event:Fecha)
  {
    this.resetear();
    this.mostrarTurnosPorFecha=true;
    this.fecha=event;
  }

  buscarPorEspecialidad()
  {
    this.resetear();
    this.porEspecialidad=true;
  }

  buscarPorPaciente()
  {
    this.resetear();
    this.porPaciente=true;

  }

  buscarPorEspecialista()
  {
    this.resetear();
    this.porEspecialista=true;

  }

  especialistaSeleccionado(event:Especialista)
  {
    this.resetear();
    this.mostrarTurnosPorEspecialista=true;
    this.especialista=event;
  }

  pacienteSeleccionado(event:Paciente)
  {
    this.resetear();
    this.mostrarTurnosPorPaciente=true;
    this.paciente=event;
  }

  especialidadSeleccionada(event: Especialidades)
  {
    this.resetear();
    this.mostrarTurnosPorEspecialidad=true;
    this.especialidad=event;
  }

  modificar(turno: Turno)
  {
    this.spinner=true;

    if(turno.calificando)
    {
      turno.calificando=false;

      this.turnoService.modificarTurno(turno).then(()=>{
        this.toastr.success("Se realizó la calificación del turno correctamente!","Éxito",{
          timeOut: 1500,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-center'
          });

      }).catch(()=>this.spinner=false);

      setTimeout(() => {

        this.router.navigateByUrl('pages/home');
      }, 1500);


    }else
    {
      this.turnoService.modificarTurno(turno).then(()=>{

        if(turno.respuesta1)
        {
          this.toastr.success("Se realizó la encuesta satisfactoriamente!","Éxito",{
            timeOut: 1500,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-center'
            });

        }else
        {
          switch (turno.estado) {
            case 'cancelado':
              this.toastr.success("El turno se canceló satisfactoriamente!","Éxito",{
                timeOut: 1500,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-center'
                });

              break;
            case 'rechazado':

            this.toastr.success("El turno se rechazó satisfactoriamente!","Éxito",{
              timeOut: 1500,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-center'
              });
              break;
            case 'aceptado':
              this.toastr.success("El turno se aceptó satisfactoriamente!","Éxito",{
                timeOut: 1500,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-center'
                });
              break;
              case 'finalizado':
                this.toastr.success("El turno se finalizó satisfactoriamente!","Éxito",{
                  timeOut: 1500,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-center'
                  });
                break;
            default:
              break;
          }

        }

        setTimeout(() => {

        this.router.navigateByUrl('pages/home');
      }, 1500);

      }).catch(()=>this.spinner=false);
    }

  }

}

