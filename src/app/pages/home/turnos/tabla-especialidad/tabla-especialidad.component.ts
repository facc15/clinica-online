import { Usuario, Especialista } from './../../../../clases/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Especialidades } from './../../../../interfaces/especialidades';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-especialidad',
  templateUrl: './tabla-especialidad.component.html',
  styleUrls: ['./tabla-especialidad.component.css']
})
export class TablaEspecialidadComponent implements OnInit {

  listaEspecialidades!: Especialidades[];
  listaEspecialidadesEspecialista: Especialidades[];
  usuarios: Usuario[];
  especialistas: Especialista[];
  especialistasPorEspecialidad: Especialista[];
  buscarEspecialista: boolean=false;

  @Input() especialista: Especialista|null=null;
  @Output() eventoEspecialidadSeleccionada= new EventEmitter<any>();

  @Input() especialidadDeUnPaciente: boolean=false;
  @Input() especialidadDeUnAdministrador: boolean=false;
  @Input() especialidadDeUnEspecialista: boolean=false;

  constructor(private firestore: FirestoreService) {
    this.listaEspecialidadesEspecialista=[];
    this.firestore.obtenerEspecialidades().subscribe((res)=>{
        this.listaEspecialidades=res;

        if(this.especialista)
        {

          this.listaEspecialidades=this.listaEspecialidades.filter(res=>{
            this.especialista?.especialidades.filter((esp:any)=>{

              if(esp==res.especialidad)
              {
                this.listaEspecialidadesEspecialista.push(res);
              }
            })
          })
        }else
        {
          this.listaEspecialidadesEspecialista=this.listaEspecialidades;

        }


    });
    this.usuarios=[];
    this.especialistas=[];
    this.especialistasPorEspecialidad=[];
    this.firestore.obtenerUsuarios().subscribe(res=>{
      this.usuarios=res;
    });
  }

  ngOnInit(): void {

  }

  elegirEspecialidad(especialidad: any)
  {
    this.eventoEspecialidadSeleccionada.emit(especialidad.especialidad);
  }

}
