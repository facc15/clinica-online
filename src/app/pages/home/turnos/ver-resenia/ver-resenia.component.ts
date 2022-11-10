import { Usuario } from './../../../../clases/usuario';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';

@Component({
  selector: 'app-ver-resenia',
  templateUrl: './ver-resenia.component.html',
  styleUrls: ['./ver-resenia.component.css']
})
export class VerReseniaComponent implements OnInit {

  @Output() eventoVolver=new EventEmitter<void>();
  @Input() turno!: Turno;


  constructor() {
    console.log('yaca');
  }

  ngOnInit(): void {
  }

  volver()
  {
    this.eventoVolver.emit();
  }

}
