import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  public numero:number;
  public numero2:number;
  public resultado:number;
  public resultadoElegido:string;
  public spinner:boolean=false;
  public esCorrecto: boolean=false;
  public esIncorrecto: boolean=false;

  @Output() eventoCaptchaCorrecto=new EventEmitter<boolean>();

  constructor()
  {
    this.numero=0;
    this.numero2=0;
    this.resultado=0;
    this.resultadoElegido="";
  }

  generarNumRandom()
  {
      let random= Math.floor(Math.random() * (31-1) + 1);
     return random;
  }

  ngOnInit(): void
  {
    this.numero=this.generarNumRandom();
    this.numero2=this.generarNumRandom();
  }

  calcular()
  {
    this.spinner=true;
    this.resultado=this.numero+this.numero2;

    setTimeout(() => {
      if(this.resultado.toString()==this.resultadoElegido)
      {
        this.esCorrecto=true;
        this.eventoCaptchaCorrecto.emit(this.esCorrecto);
      }else
      {
        this.esIncorrecto=true;
      }

      this.spinner=false;
      if(this.esIncorrecto)
      {
        this.numero=this.generarNumRandom();
        this.numero2=this.generarNumRandom();
        this.resultadoElegido="";

        setTimeout(() => {
          this.esIncorrecto=false;
        }, 1000);
      }
    }, 2000);
  }

}
