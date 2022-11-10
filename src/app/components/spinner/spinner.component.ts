import { style, trigger, state, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  animations:[
    trigger('animacionSpinner',[
      state('estado1',style({
        fontSize: 200,
      })),
      state('estado2',style({
      })),
      transition('estado1 <=> estado2',
      animate(1000)
      )

    ])

  ]
})
export class SpinnerComponent implements OnInit {

  public estadoSpinner="'estado1";
  public estado1:string;
  public estado2:string;
  @Input() color: string;

  constructor()
  {
    this.estado1="";
    this.estado2="";
    this.color="";
  }

  hagaAlgo()
  {

  }

  ngOnInit(): void
  {

      this.estadoSpinner= this.estadoSpinner == 'estado1'? 'estado2': 'estado1';

  }

}
