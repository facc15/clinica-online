import { FirestoreService } from './../../../../servicios/firestore.service';
import { Paciente } from 'src/app/clases/usuario';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css']
})
export class TablaPacientesComponent implements OnInit {

  @Input() pacientesDeUnEspecialista: boolean=false;
  @Input() pacientesDeUnAdministrador: boolean=false;
  @Output() eventoPacienteSeleccionado=new EventEmitter<Paciente>();

  public listaPacientes: Paciente[];

  constructor(private firestore:FirestoreService)
  {
    this.listaPacientes=[];
    this.firestore.obtenerUsuarios().subscribe(res=>{
      this.listaPacientes=<Paciente[]>res.filter(pac=>pac.perfil=='paciente')
      });
   }

  ngOnInit(): void {
  }

  elegirPaciente(paciente: Paciente)
  {
    this.eventoPacienteSeleccionado.emit(paciente);
  }


}
