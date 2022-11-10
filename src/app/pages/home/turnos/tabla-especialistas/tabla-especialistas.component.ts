import { Especialista } from './../../../../clases/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { endOfSecond } from 'date-fns';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.css']
})
export class TablaEspecialistasComponent implements OnInit {

  @Input() especialidad: any;
  @Input() especialistasDeUnPaciente: boolean=false;
  @Input() especialistasDeUnAdministrador: boolean=false;

  @Output() eventoEspecialistaSeleccionado= new EventEmitter<Especialista>();
  public listaEspecialistas: Especialista[];
  public listaEspecialistasPorEspecialidad: Especialista[];

  constructor(private firestore: FirestoreService) {
    this.listaEspecialistas=[];
    this.listaEspecialistasPorEspecialidad=[];
    this.firestore.obtenerUsuarios().subscribe(res=>{
      this.listaEspecialistas= <Especialista[]>res.filter(esp=>esp.perfil=='especialista');

      if(this.especialidad)
      {
        this.listaEspecialistas=this.listaEspecialistas.filter(esp=>esp.especialidades.filter(esp2=>{

          if(esp2==this.especialidad)
          this.listaEspecialistasPorEspecialidad.push(esp);

        }));

        this.listaEspecialistasPorEspecialidad=this.listaEspecialistasPorEspecialidad.filter((especialista)=>especialista.verificacionAdmin==true);
      }else
      {
        this.listaEspecialistasPorEspecialidad=this.listaEspecialistas.filter((especialista)=>especialista.verificacionAdmin==true);
      }
    });

   }

  ngOnInit(): void {
  }

  elegirEspecialista(especialista: Especialista)
  {
    this.eventoEspecialistaSeleccionado.emit(especialista);
  }

}
