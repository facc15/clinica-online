import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turno } from 'src/app/interfaces/turno';

@Component({
  selector: 'app-completar-encuesta',
  templateUrl: './completar-encuesta.component.html',
  styleUrls: ['./completar-encuesta.component.css']
})
export class CompletarEncuestaComponent implements OnInit {

  @Input() turno!: Turno;
  @Output() eventoVolver=new EventEmitter<void>();
  @Output() eventoTurnoModificado=new EventEmitter<Turno>();

  public form: FormGroup;
  public pregunta1: string="Se encuentra satisfecho con el servicio web?";
  public pregunta2: string="Qué mejoras le haría a la página?";

  constructor(public builder :FormBuilder)
  {
    this.form= this.builder.group({
      'respuesta1':['',[Validators.required]],
      'respuesta2':['',[Validators.required]],
    });
    this.turno= {respuesta1:{},respuesta2:{}} as Turno;
  }

  volver()
  {
    this.eventoVolver.emit();
  }


  ngOnInit(): void {
  }

  confirmar()
  {
    this.turno.pregunta1=this.pregunta1;
    this.turno.pregunta2=this.pregunta2;
    this.turno.respuesta1=this.form.value.respuesta1;
    this.turno.respuesta2=this.form.value.respuesta2;

    this.eventoTurnoModificado.emit(this.turno);

  }

}
