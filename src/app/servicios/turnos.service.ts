import { Fecha } from 'src/app/clases/fecha';
import { Especialista } from 'src/app/clases/usuario';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { es, fi } from 'date-fns/locale';
import { format } from 'date-fns';
import { addDoc, collection, collectionData, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Turno } from 'src/app/interfaces/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  turnoCollectionReference: any;
  turnos : Turno[] = [];
  fechas: Fecha[];
  fecha: Fecha;
  horas: string[]=['13:00','13:30','14:00','14:30','15:00','15:30','16:00'];
  docRef!: string;
  turnosEspecialista: Turno[];

  constructor(private af : AngularFirestore,private firestore: Firestore,private toastr: ToastrService,private router: Router) {
    this.turnoCollectionReference = this.af.collection('Turnos');
    this.turnosEspecialista=[];
    this.fecha=new Fecha("","","");
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
      const mesNumero= format(hoy,'MM',{locale:es});

      const fecha= new Fecha(numero,dia,mes,this.horas,mesNumero);
      if(dia=='lunes' || dia=='miércoles')
      {
         this.fechas.push(fecha);

      }


    }
    return this.fechas;
  }

  fechasDisponibles(especialista: Especialista): Fecha[]
  {

    this.turnosEspecialista=this.turnos.filter(turno=>especialista.uid==turno.uidEspecialista);
    const fechasDispo=Array();
    var algo=0;


    for (const fecha of this.fechas)
    {
      this.fecha=new Fecha("","","");
      this.fecha.dia=fecha.dia;
      this.fecha.diaNumero=fecha.diaNumero;
      this.fecha.mesNumero=fecha.mesNumero;
      this.fecha.mes=fecha.mes;
      this.horas=['13:00','13:30','14:00','14:30','15:00','15:30','16:00'];
      for (const turno of this.turnosEspecialista)
      {
        for (let index = 0; index < this.horas.length; index++)
        {
              if(turno.fecha.diaNumero==fecha.diaNumero)
              {
                if(this.horas[index]==turno.fecha.hora)
                {
                  this.horas.splice(index,1);
                }
              }

             }
      }
      if(this.horas.length>0)
      {
        this.fecha.horas=this.horas;
        fechasDispo.push(this.fecha);
      }
    }

    return fechasDispo;
  }


  hayHora(horas: string[], hora:string)
  {

    let retorno=false;
    for (const item of horas)
    {
      if(hora==item)
      {
        retorno=true;
      }
    }

    return retorno;
  }



  horasDisponibles(especialista: Especialista,fecha: Fecha)
  {

      const turnosDeUnEspecialista=this.turnos.filter
      (turno=>turno.uidEspecialista==especialista.uid
        && turno.fecha.diaNumero==fecha.diaNumero
        && turno.fecha.dia==fecha.dia
        && turno.fecha.mes==fecha.mes);
        const horariosOcupados=Array();
      for (let turno of turnosDeUnEspecialista)
      {
        horariosOcupados.push(turno.fecha.hora);
      }


      const horas=['13:00','13:30','14:00','14:30','15:00','15:30','16:00'];




      return horas;
  }

}


