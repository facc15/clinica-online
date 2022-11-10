
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Fecha } from '../clases/fecha';
import { addDoc, collection, collectionData, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Turno } from 'src/app/interfaces/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  turnoCollectionReference: any;
  turnos : Turno[] = [];
  fechas: Fecha[];
  docRef!: string;

  constructor(private af : AngularFirestore,private firestore: Firestore,private toastr: ToastrService,private router: Router) {
    this.turnoCollectionReference = this.af.collection('Turnos');


    this.fechas=[];

    this.obtenerTurnos().subscribe(res=>{
      this.turnos=res;
    });
   }

   obtenerTurnos(): Observable<Turno[]>
   {
     const ref= collection(this.firestore,'Turnos');
     return collectionData(ref,{idField: 'id'}) as Observable<Turno[]>;
   }

   generarIdRandom()
   {
       let random= Math.floor(Math.random() * (1000000000000-0) + 0);

      return random.toString();
   }



  async agregarTurno(turno: Turno)
  {
      const place= collection(this.firestore,'Turnos');
      let random= this.generarIdRandom();

      await setDoc(doc(this.firestore,'Turnos',random),{
        id:random,
        uidPaciente:turno.uidPaciente,
        paciente:turno.paciente,
        uidEspecialista:turno.uidEspecialista,
        especialista:turno.especialista,
        fecha:turno.fecha,
        estado:turno.estado,
        especialidad:turno.especialidad
      });

  }

  modificarTurno(turno : Turno)
  {
    return this.af.collection('Turnos').doc(turno.id).update(turno);
  }


  traerFechas(): Fecha[]
  {
    this.fechas=[];
    for (let index = 0; index < 15; index++)
    {
      const hoy=new Date();
      hoy.setDate(hoy.getDate()+index);

      //const fechaFormato=format(hoy,'EEEE dd MMMM - HH:mm aaa', { locale: es });

      const dia=format(hoy,'EEEE',{locale:es});
      const numero=format(hoy,'dd',{locale:es});
      const mes=format(hoy,'MMMM',{locale:es});

      const hora=['13:00','13:30','14:00','14:30','15:00','15:30','16:00'];

      const fecha= new Fecha(numero,dia,mes,hora);
      if(dia=='lunes' || dia=='miércoles')
      {
         this.fechas.push(fecha);

      }


    }
    return this.fechas;
  }

}


