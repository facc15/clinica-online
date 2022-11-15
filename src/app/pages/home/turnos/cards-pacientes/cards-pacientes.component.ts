import { TurnoService } from 'src/app/servicios/turnos.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Paciente } from 'src/app/clases/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Turno } from 'src/app/interfaces/turno';
import { getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-cards-pacientes',
  templateUrl: './cards-pacientes.component.html',
  styleUrls: ['./cards-pacientes.component.css']
})
export class CardsPacientesComponent implements OnInit {

  @Output() eventoPacienteSeleccionado=new EventEmitter<Paciente>();

  public listaPacientes: Paciente[];
  public turnos!: Turno[];
  public foto!: string;

  constructor(private firestore:FirestoreService,private turnoService:TurnoService)
  {
    this.listaPacientes=[];
    try{
    this.firestore.obtenerUsuarios().subscribe(res=>{
      this.listaPacientes=<Paciente[]>res.filter(pac=>pac.perfil=='paciente')

      for (let index = 0; index < this.listaPacientes.length; index++)
      {

        this.firestore.traerFotos().then( async response=>{
          for(let item2 of response.items)
          {

              const url=await getDownloadURL(item2);

              if(this.listaPacientes[index].pathPerfil==item2.name)
              {
                this.listaPacientes[index].pathPerfil=url;
              }
          }

          }).catch(error=>{console.log(error);});
      }

      });
    }catch{

    }

      this.turnoService.obtenerTurnos().subscribe(turnos=>{
        this.turnos=turnos;
      });



   }

  ngOnInit(): void {

  }

  pacienteSeleccionado(paciente: Paciente)
  {
    this.eventoPacienteSeleccionado.emit(paciente);
  }

}
