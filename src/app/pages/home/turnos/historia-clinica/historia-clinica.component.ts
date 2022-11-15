import { HistoriaClinica } from 'src/app/interfaces/historia-clinica';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turno } from 'src/app/interfaces/turno';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  @Output() eventoTurnoModificado=new EventEmitter<Turno>();
  @Output() eventoVolver=new EventEmitter<void>();
  @Input() turno!: Turno;

  public historiaClinica: HistoriaClinica;
  public form: FormGroup;
  public hacerResenia:boolean=true;
  public resenia: string="";

  public mostrarDato1:boolean=false;
  public mostrarDato2:boolean=false;
  public mostrarDato3:boolean=false;


  constructor(public builder :FormBuilder)
  {
    this.form= this.builder.group({
      'altura':['',[Validators.required,Validators.min(130),Validators.max(300)]],
      'peso':['',[Validators.required,Validators.min(25),Validators.max(500)]],
      'temperatura':['',[Validators.required,Validators.min(20),Validators.max(45)]],
      'presion':['',[Validators.required]],
      'clave1':['',],
      'valor1':['',],
      'clave2':['',],
      'valor2':['',],
      'clave3':['',],
      'valor3':['',],
    });



    this.historiaClinica= {altura:{},peso:{},temperatura:{},presion:{},datoDinamico1:{},datoDinamico2:{},datoDinamico3:{}} as HistoriaClinica;

  }

  ngOnInit(): void
  {

  }

  irAAgregarDatos()
  {
    this.hacerResenia=false;
  }
  volverAResenia()
  {
    this.hacerResenia=true;
  }


  agregarDato()
  {
    if(!this.mostrarDato1)
    {
      this.mostrarDato1=true;
    }else
    {
      if(!this.mostrarDato2)
      {
        this.mostrarDato2=true;
      }else
      {
        this.mostrarDato3=true;
      }
    }


  }

  confirmar()
  {
    this.historiaClinica.altura=this.form.value.altura;
    this.historiaClinica.peso=this.form.value.peso;
    this.historiaClinica.presion=this.form.value.presion;
    this.historiaClinica.temperatura=this.form.value.temperatura;
    this.turno.estado='finalizado';

    if(!this.mostrarDato1 && !this.mostrarDato2 && !this.mostrarDato3)
    {
      this.turno.historiaClinica=this.historiaClinica;
      this.eventoTurnoModificado.emit(this.turno);

    }else if(this.mostrarDato1)
    {
        this.historiaClinica.datoDinamico1.clave= this.form.value.clave1;
        this.historiaClinica.datoDinamico1.valor= this.form.value.valor1;

        if(this.mostrarDato2)
        {
          this.historiaClinica.datoDinamico2.clave= this.form.value.clave2;
          this.historiaClinica.datoDinamico2.valor= this.form.value.valor2;
        }

         if(this.mostrarDato3)
        {
          this.historiaClinica.datoDinamico3.clave= this.form.value.clave3;
          this.historiaClinica.datoDinamico3.valor= this.form.value.valor3;
        }

        this.turno.historiaClinica=this.historiaClinica;
        this.eventoTurnoModificado.emit(this.turno);
    }

  }

  volver()
  {
    this.eventoVolver.emit();
  }

}
