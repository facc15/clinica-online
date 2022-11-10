import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turno } from 'src/app/interfaces/turno';

@Component({
  selector: 'app-calificar-atencion',
  templateUrl: './calificar-atencion.component.html',
  styleUrls: ['./calificar-atencion.component.css']
})
export class CalificarAtencionComponent implements OnInit {

  @Input() turno!: Turno;
  @Output() eventoVolver=new EventEmitter<void>();
  @Output() eventoTurnoModificado=new EventEmitter<Turno>();

  public form: FormGroup;

  public puntuaciones=['1','2','3','4','5','6','7','8','9','10'];

  constructor(public builder :FormBuilder, private toastr: ToastrService)
  {
    this.form= this.builder.group({
      'devolucion':['',[Validators.required]],
    });
    this.turno= {calificacion:{},devolucion:{},calificando:{}} as Turno;
  }


  ngOnInit(): void {
  }

  volver()
  {
    this.eventoVolver.emit();
  }

  capturarSeleccion(valoracion: any)
  {
    this.turno.calificacion=valoracion.target.value;
  }

  confirmar()
  {
    if(this.turno.calificacion)
    {
      this.turno.calificando=true;
      this.turno.devolucion=this.form.value.devolucion;
      this.eventoTurnoModificado.emit(this.turno);
    }else
    {
      this.toastr.error("Es necesario poner una calificación","Error",{
        timeOut: 1500,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-center'
        });

    }
  }

}
