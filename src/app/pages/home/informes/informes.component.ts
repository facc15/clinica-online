import { TurnoService } from './../../../servicios/turnos.service';
import { Usuario } from './../../../clases/usuario';
import { Log, Data } from './../../../interfaces/log';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Turno } from 'src/app/interfaces/turno';
import * as Highcharts from 'highcharts';

const HighchartsMore = require("highcharts/highcharts-more.src");
HighchartsMore(Highcharts);

import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

import HC_exportData from 'highcharts/modules/export-data';
HC_exportData(Highcharts);

import ExportingModule from 'highcharts/modules/exporting';
import DownloadingModule from 'highcharts/modules/export-data.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

ExportingModule(Highcharts);
DownloadingModule(Highcharts);


Chart.register(...registerables);


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  logs:Log[]=[];
  map: Map<string,number>;

  verLog:boolean=false;
  turnosPorEspecialidad:boolean=false;
  turnosPorDia:boolean=false;
  turnosSolicitadosPorLapsoDeTiempo:boolean=false;
  turnosFinalizadosPorLapsoDeTiempo:boolean=false;
  noHayTurnos:boolean=false;
  verGraf:boolean=false;


  turnos:Turno[];
  turnosOrdenadosPorDia: Turno[];
  turnosOrdenadosPorMes:Turno[];
  turnosPorLapsoDeTiempo: Turno[];

  logsOrdenadosPorDia: Log[];
  logsOrdenadosPorMes:Log[];
  logsOrdenadosPorHora:Log[];
  fechas: string[];
  array: any[];


  data: Data;
  datas:Data[]=[];

  highcharts=Highcharts;

  chartOptions: any;
  public form: FormGroup;

  constructor(public builder :FormBuilder,private firestore: FirestoreService,private turnoService: TurnoService) {
    this.form= this.builder.group({
      'mesInicio':['',[Validators.required,Validators.min(1),Validators.max(12)]],
      'diaInicio':['',[Validators.required,Validators.min(1),Validators.max(31)]],
      'mesFinal':['',[Validators.required,Validators.min(1),Validators.max(12)]],
      'diaFinal':['',[Validators.required,Validators.min(1),Validators.max(31)]],

    });
    this.map=new Map();
    this.data={name:{},data:{}} as Data;
    this.turnos=[];
    this.turnosOrdenadosPorDia=[];
    this.turnosOrdenadosPorMes=[];
    this.turnosPorLapsoDeTiempo=[];
    this.logsOrdenadosPorDia=[];
    this.logsOrdenadosPorMes=[];
    this.logsOrdenadosPorHora=[];
    this.fechas=[];
    this.array=[];
  }

  ngOnInit(): void {
    this.firestore.obtenerLogs().subscribe(logs=>{
      this.logs=logs;

      this.logsOrdenadosPorMes=this.logs.sort((log:Log,log2:Log)=>{

        if(log.mes>log2.mes)
        {
          return -1;
        }else if(log.mes<log2.mes)
        {
          return 1;
        }else
        {
          return 0;
        }

      });


      this.logsOrdenadosPorDia=this.logsOrdenadosPorMes.sort((log:Log,log2:Log)=>{

        if(log.mes==log2.mes)
        {
          if(log.dia>log2.dia)
          {
            return -1;
          }else if(log.dia<log2.dia)
          {
            return 1;
          }else
          {
            if(log.hora>log2.hora)
            {
              return -1;
            }else if(log.hora<log2.hora)
            {
              return 1;
            }else
            {
              if(log.minuto>log2.minuto)
              {
                return -1;

              }else if(log.minuto>log2.minuto)
              {
                return 1;
              }
              else{
                return 0;
              }
            }

          }
        }


        return 0;

      });

      this.logsOrdenadosPorHora=this.logsOrdenadosPorDia.sort((log:Log,log2:Log)=>{

        if(log.dia>log2.dia)
        {
          return -1;
        }else if(log.dia<log2.dia)
        {
          return 1;
        }else
        {
          return 0;
        }

    });


    });

    this.turnoService.obtenerTurnos().subscribe(res=>{
      this.turnos=res;

      this.turnosOrdenadosPorMes=this.turnos.sort((turno:Turno,turno2:Turno)=>{

        if(turno.fecha.mesNumero<turno2.fecha.mesNumero)
        {
          return -1;
        }else if(turno.fecha.mesNumero>turno2.fecha.mesNumero)
        {
          return 1;
        }else
        {
          return 0;
        }

      });


      this.turnosOrdenadosPorDia=this.turnosOrdenadosPorMes.sort((turno:Turno,turno2:Turno)=>{

        if(turno.fecha.mesNumero==turno2.fecha.mesNumero)
        {
          if(turno.fecha.diaNumero<turno2.fecha.diaNumero)
          {
            return -1;
          }else if(turno.fecha.diaNumero>turno2.fecha.diaNumero)
          {
            return 1;
          }else
          {
            return 0;
          }
        }


        return 0;

      });
      console.log(this.turnosOrdenadosPorDia);
    });




  }

  verLogsAlSistema()
  {
    this.verLog=!this.verLog;
    this.turnosPorEspecialidad=false;
    this.turnosPorDia=false;
    this.turnosSolicitadosPorLapsoDeTiempo=false;
    this.turnosFinalizadosPorLapsoDeTiempo=false;

    this.datas=[];

    for (const log of this.logsOrdenadosPorDia)
    {
      let data= {name:{},y:{}} as Data;
      data.y=0;
      let fecha= log.dia+"/"+log.mes+" "+log.hora+":"+log.minuto+" hs";
      data.name=log.usuario.nombre+" "+log.usuario.apellido;

      this.fechas.push(fecha);

      if(!this.datas.some(dat=>dat.name==data.name))
      {
        this.datas.push(data);
      }

    }

    this.datas.forEach((data,index)=>{


       let cantidadLogs= this.cuantosLogsUsuarios(data,this.logsOrdenadosPorDia);

        this.datas[index].y=cantidadLogs;
    });

    console.log(this.datas);
    this.chartOptions={
      credits:{
        enabled:false,
      },
      chart:{
        type:'pie'
      },
      title:{
        text:'Promedio de logs por usuario'
      },
      xAxis:{
        title:{
          text: 'Usuarios'
        },
        categories:"",
        crosshair:true,

      },
      yAxis:{
        title:{

          text:'Logs'
        }

      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{name:'Logs',data:this.datas}],
      exporting: {
        allowHTML: true,

        pdfFont: {
          normal: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Regular.ttf',
          bold: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Bold.ttf',
          bolditalic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-BoldItalic.ttf',
          italic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Italic.ttf'
      }
      }

    };



  }

  cuantosLogsUsuarios(data:Data,logs:Log[])
  {
    let contador=0;

    for (const log of logs)
    {
       if(data.name==log.usuario.nombre+" "+log.usuario.apellido)
       {
        contador++;
       }

    }
    return contador;
  }


  verTurnosPorEspecialidad()
  {
    this.verLog=false;

    this.turnosPorEspecialidad=!this.turnosPorEspecialidad;
    this.turnosPorDia=false;
    this.turnosSolicitadosPorLapsoDeTiempo=false;
    this.turnosFinalizadosPorLapsoDeTiempo=false;

    this.datas=[];

    for (const turno of this.turnosOrdenadosPorDia)
    {
      let data= {name:{},data:{}} as Data;
      data.data=[];
      let fecha= turno.fecha.diaNumero+"/"+turno.fecha.mesNumero;
      data.name=turno.especialidad.especialidad;

      this.fechas.push(fecha);

      if(!this.datas.some(dat=>dat.name==data.name))
      {
        this.datas.push(data);
      }

    }

    this.datas.forEach((data,index)=>{


       let cantidadTurnos= this.cuantosTurnosEspecialidad(data,this.turnosOrdenadosPorDia);

        this.datas[index].data[0]=cantidadTurnos;
    });

    this.chartOptions={
      credits:{
        enabled:false,
      },
      chart:{
        type:'column'
      },
      title:{
        text:'Turnos por especialidad'
      },
      xAxis:{
        title:{
          text: 'Especialidades'
        },
        categories:"",
        crosshair:true,

      },
      yAxis:{
        title:{

          text:'Cantidad de turnos'
        }

      },
      series:this.datas,
      exporting: {
        allowHTML: true,

        pdfFont: {
          normal: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Regular.ttf',
          bold: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Bold.ttf',
          bolditalic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-BoldItalic.ttf',
          italic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Italic.ttf'
      }
      }

    };

  }

  verTurnosPorDia()
  {
    this.turnosPorEspecialidad=false;
    this.verLog=false;
    this.turnosSolicitadosPorLapsoDeTiempo=false;
    this.turnosFinalizadosPorLapsoDeTiempo=false;
    this.turnosPorDia=!this.turnosPorDia;

    this.fechas=[];
    this.datas=[];

    for (const turno of this.turnosOrdenadosPorDia)
    {
      let data= {name:{},data:{}} as Data;
      data.data=[];
      let fecha= turno.fecha.diaNumero+"/"+turno.fecha.mesNumero;
      data.name=turno.especialista;


      if(!this.fechas.includes(fecha))
      {
        this.fechas.push(fecha);

        if(!this.datas.some(dat=>dat.name==data.name))
        {
          this.datas.push(data);
        }
      }else
      {
        if(!this.datas.some(dat=>dat.name==data.name))
        {
          this.datas.push(data);
        }
      }

    }

    this.datas.forEach((data,index)=>{

      this.fechas.forEach((fechi,i)=>{


       let cantidadTurnos= this.cuantosTurnosEspecialista(data,this.turnosOrdenadosPorDia,fechi);

        this.datas[index].data[i]=cantidadTurnos;

      });



    });

    this.chartOptions={
      credits:{
        enabled:false,
      },
      title:{
        text:'Turnos por día'
      },
      xAxis:{
        categories:this.fechas


      },
      yAxis:{
        title:{

          text:'Cantidad de turnos'
        }

      },
      series:this.datas,
      exporting: {
        allowHTML: true,

        pdfFont: {
          normal: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Regular.ttf',
          bold: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Bold.ttf',
          bolditalic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-BoldItalic.ttf',
          italic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Italic.ttf'
      }
      }

    };

  }

  cuantosTurnosEspecialista(data:Data,turnos:Turno[],fechi: string)
  {
    let contador=0;

    for (const turno of turnos)
    {
       let fecha= turno.fecha.diaNumero+"/"+turno.fecha.mesNumero;

       if(fechi==fecha && data.name==turno.especialista)
       {
        contador++;
       }

    }
    return contador;
  }

  cuantosTurnosEspecialidad(data:Data,turnos:Turno[])
  {
    let contador=0;

    for (const turno of turnos)
    {
       if(data.name==turno.especialidad.especialidad)
       {
        contador++;
       }

    }
    return contador;
  }

  verTurnosSolicitadosPorLapsoDeTiempo()
  {
    this.turnosSolicitadosPorLapsoDeTiempo=true;
    this.turnosFinalizadosPorLapsoDeTiempo=false;
    this.verLog=false;
    this.verGraf=false;
    this.turnosPorDia=false;
    this.turnosPorEspecialidad=false;



  }

  verTurnosSolicitadosPorLapsoDeTiempoGraf()
  {
    this.fechas=[];
    this.datas=[];
    this.turnosPorLapsoDeTiempo=[];
    this.noHayTurnos=false;


    const fechaElegida={mesInicio:{},diaInicio:{},mesFinal:{},diaFinal:{}};

    fechaElegida.diaInicio=this.form.value.diaInicio;
    fechaElegida.mesInicio=this.form.value.mesInicio;
    fechaElegida.diaFinal=this.form.value.diaFinal;
    fechaElegida.mesFinal=this.form.value.mesFinal;


    for (const turno of this.turnosOrdenadosPorDia)
    {
      if(fechaElegida.mesInicio>turno.fecha.mesNumero)
      {
      continue;
      }else if(fechaElegida.mesInicio==turno.fecha.mesNumero)
      {
        if(fechaElegida.diaInicio>turno.fecha.diaNumero)
        {
          continue;
        }

      }else if(fechaElegida.mesInicio<turno.fecha.mesNumero)

        if(fechaElegida.mesFinal<turno.fecha.mesNumero)
        {
          continue;

        }else if(fechaElegida.mesFinal==turno.fecha.mesNumero)
        {

          if(fechaElegida.diaFinal<turno.fecha.diaNumero)
          {
            continue;
          }

        }
        this.turnosPorLapsoDeTiempo.push(turno);
      }

for (const turno of this.turnosPorLapsoDeTiempo)
    {
      let data= {name:{},data:{}} as Data;
      data.data=[];
      let fecha= turno.fecha.diaNumero+"/"+turno.fecha.mesNumero;
      data.name=turno.especialista;


      if(!this.fechas.includes(fecha))
      {
        this.fechas.push(fecha);

        if(!this.datas.some(dat=>dat.name==data.name))
        {
          this.datas.push(data);
        }
      }else
      {
        if(!this.datas.some(dat=>dat.name==data.name))
        {
          this.datas.push(data);
        }
      }

    }

    this.datas.forEach((data,index)=>{

      this.fechas.forEach((fechi,i)=>{


       let cantidadTurnos= this.cuantosTurnosSolicitadosEspecialistas(data,this.turnosPorLapsoDeTiempo,fechi);

        this.datas[index].data[i]=cantidadTurnos;

      });

    });


    let vacio=true;
    for (const data of this.datas) {

      for (const dati of data.data) {

        if(dati>0)
        {
          vacio=false
          break;
        }
      }


    }


    if(this.datas.length>0 && !vacio)
    this.verGraf=true;
    else
    this.noHayTurnos=true;

    this.chartOptions={
      credits:{
        enabled:false,
      },
      chart:{
        type:'bar'
      },
      title: {
        text:'Turnos solicitados desde '+fechaElegida.diaInicio+"/"+fechaElegida.mesInicio +' hasta '+fechaElegida.diaFinal+"/"+fechaElegida.mesFinal
      },
      xAxis:{
        categories:this.fechas,
        title:{
          text:'Fechas'

        }
      },
      yAxis:{
        title:{
          text:'Cantidad de turnos'
        }

      },
      series:this.datas,
      exporting: {
        allowHTML: true,
        pdfFont: {
          normal: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Regular.ttf',
          bold: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Bold.ttf',
          bolditalic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-BoldItalic.ttf',
          italic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Italic.ttf'
      }
      }

    };

  }

  cuantosTurnosSolicitadosEspecialistas(data:Data,turnos:Turno[],fechi: string)
  {
    let contador=0;

    for (const turno of turnos)
    {
       let fecha= turno.fecha.diaNumero+"/"+turno.fecha.mesNumero;

       if(fechi==fecha && data.name==turno.especialista && turno.estado=='pendiente')
       {
        contador++;
       }

    }
    return contador;
  }

  cuantosTurnosFinalizadosEspecialistas(data:Data,turnos:Turno[],fechi: string)
  {
    let contador=0;

    for (const turno of turnos)
    {
       let fecha= turno.fecha.diaNumero+"/"+turno.fecha.mesNumero;

       if(fechi==fecha && data.name==turno.especialista && turno.estado=='finalizado')
       {
        contador++;
       }

    }
    return contador;
  }

  verTurnosFinalizadosPorLapsoDeTiempoGraf()
  {
    this.fechas=[];
    this.datas=[];
    this.turnosPorLapsoDeTiempo=[];
    this.noHayTurnos=false;


    const fechaElegida={mesInicio:{},diaInicio:{},mesFinal:{},diaFinal:{}};

    fechaElegida.diaInicio=this.form.value.diaInicio;
    fechaElegida.mesInicio=this.form.value.mesInicio;
    fechaElegida.diaFinal=this.form.value.diaFinal;
    fechaElegida.mesFinal=this.form.value.mesFinal;


    console.log(fechaElegida);


    for (const turno of this.turnosOrdenadosPorDia)
    {
      if(fechaElegida.mesInicio>turno.fecha.mesNumero)
      {
      continue;
      }else if(fechaElegida.mesInicio==turno.fecha.mesNumero)
      {
        if(fechaElegida.diaInicio>turno.fecha.diaNumero)
        {
          continue;
        }

      }else if(fechaElegida.mesInicio<turno.fecha.mesNumero)

        if(fechaElegida.mesFinal<turno.fecha.mesNumero)
        {
          continue;

        }else if(fechaElegida.mesFinal==turno.fecha.mesNumero)
        {

          if(fechaElegida.diaFinal<turno.fecha.diaNumero)
          {
            continue;
          }

        }
        this.turnosPorLapsoDeTiempo.push(turno);
      }

for (const turno of this.turnosPorLapsoDeTiempo)
    {
      let data= {name:{},data:{}} as Data;
      data.data=[];
      let fecha= turno.fecha.diaNumero+"/"+turno.fecha.mesNumero;
      data.name=turno.especialista;


      if(!this.fechas.includes(fecha))
      {
        this.fechas.push(fecha);

        if(!this.datas.some(dat=>dat.name==data.name))
        {
          this.datas.push(data);
        }
      }else
      {
        if(!this.datas.some(dat=>dat.name==data.name))
        {
          this.datas.push(data);
        }
      }

    }

    this.datas.forEach((data,index)=>{

      this.fechas.forEach((fechi,i)=>{


       let cantidadTurnos= this.cuantosTurnosFinalizadosEspecialistas(data,this.turnosPorLapsoDeTiempo,fechi);

        this.datas[index].data[i]=cantidadTurnos;

      });



    });
    let vacio=true;
    for (const data of this.datas) {

      for (const dati of data.data) {

        if(dati>0)
        {
          vacio=false
          break;
        }
      }


    }

    if(this.datas.length>0 && !vacio)
    this.verGraf=true;
    else
    this.noHayTurnos=true;

    this.chartOptions={
      credits:{
        enabled:false,
      },
      chart:{
        type:'areaspline'
      },
      title: {
        text:'Turnos finalizados desde '+fechaElegida.diaInicio+"/"+fechaElegida.mesInicio +' hasta '+fechaElegida.diaFinal+"/"+fechaElegida.mesFinal
      },
      xAxis:{
        categories:this.fechas,
        title:{
          text:'Fechas'

        }
      },
      yAxis:{
        title:{
          text:'Cantidad de turnos'
        }

      },
      series:this.datas,
      exporting: {
        allowHTML: true,
        pdfFont: {
          normal: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Regular.ttf',
          bold: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Bold.ttf',
          bolditalic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-BoldItalic.ttf',
          italic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Italic.ttf'
      }
      }

    };

  }

  verTurnosFinalizadosPorLapsoDeTiempo()
  {
    this.turnosPorDia=false;
    this.turnosPorEspecialidad=false;
    this.turnosSolicitadosPorLapsoDeTiempo=false;
    this.turnosFinalizadosPorLapsoDeTiempo=true;
    this.verGraf=false;
    this.verLog=false;
  }



}
