import { Usuario } from './../../../../clases/usuario';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Turno } from 'src/app/interfaces/turno';
import { TurnoService } from 'src/app/servicios/turnos.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-modificar-turno',
  templateUrl: './modificar-turno.component.html',
  styleUrls: ['./modificar-turno.component.css']
})
export class ModificarTurnoComponent implements OnChanges {


  @Input() turno!: Turno;
  @Input() rechazado: boolean=false;
  @Input() cancelado: boolean=false;
  @Input() aceptado: boolean=false;
  @Input() finalizado: boolean=false;
  @Input() usuario!: Usuario;

  modificadoPor: string;

  @Output() eventoTurnoModificado=new EventEmitter<Turno>();
  @Output() eventoVolver=new EventEmitter<void>();

  public form: FormGroup;

  constructor(public builder :FormBuilder)
  {
    this.form= this.builder.group({
      'resenia':['',[Validators.required]]
    });
    this.modificadoPor="";
    this.turno= {resenia:{}} as Turno;

  }

  ngOnChanges()
   {
    setTimeout(() => {
      if(this.aceptado && this.turno)
      {
        this.turno.estado='aceptado';

        this.eventoTurnoModificado.emit(this.turno);
      }

    }, 0);


  }

  volver()
  {
    this.rechazado=false;
    this.cancelado=false;
    this.eventoVolver.emit();
  }

  confirmar()
  {
    if(this.rechazado)
    this.turno.estado='rechazado';
    else if(this.cancelado)
    this.turno.estado='cancelado';
    else if(this.finalizado)
    this.turno.estado='finalizado';

    if(this.rechazado || this.cancelado)
    {
      this.modificadoPor=this.usuario.perfil+" "+this.usuario.apellido+", "+this.usuario.nombre+":\r";
      this.turno.resenia=this.modificadoPor+this.form.value.resenia;
    }else if(this.finalizado)
    {
      this.turno.resenia=this.form.value.resenia;
    }
    this.eventoTurnoModificado.emit(this.turno);
  }

}
