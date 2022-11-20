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
  turnosfinalizadosPorLapsoDeTiempo:boolean=false;


  turnos:Turno[];
  turnosOrdenadosPorDia: Turno[];
  turnosOrdenadosPorMes:Turno[];

  logsOrdenadosPorDia: Log[];
  logsOrdenadosPorMes:Log[];
  fechas: string[];
  array: any[];


  data: Data;
  datas:Data[]=[];

  highcharts=Highcharts;

  chartOptions: any;

  constructor(private firestore: FirestoreService,private turnoService: TurnoService) {
    this.map=new Map();
    this.data={name:{},data:{}} as Data;
    this.turnos=[];
    this.turnosOrdenadosPorDia=[];
    this.turnosOrdenadosPorMes=[];
    this.logsOrdenadosPorDia=[];
    this.logsOrdenadosPorMes=[];
    this.fechas=[];
    this.array=[];
  }

  ngOnInit(): void {
    this.firestore.obtenerLogs().subscribe(logs=>{
      this.logs=logs;

      this.logsOrdenadosPorMes=this.logs.sort((log:Log,log2:Log)=>{

        if(log.mes<log2.mes)
        {
          return -1;
        }else if(log.mes>log2.mes)
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
          if(log.dia<log2.dia)
          {
            return -1;
          }else if(log.dia>log2.dia)
          {
            return 1;
          }else
          {
            return 0;
          }
        }


        return 0;

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
    this.turnosfinalizadosPorLapsoDeTiempo=false;

  }


  verTurnosPorEspecialidad()
  {
    this.verLog=false;

    this.turnosPorEspecialidad=!this.turnosPorEspecialidad;
    this.turnosPorDia=false;
    this.turnosSolicitadosPorLapsoDeTiempo=false;
    this.turnosfinalizadosPorLapsoDeTiempo=false;

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


    const mapeado=this.datas.map(data=>data.name);
    console.log(mapeado);
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
    this.turnosfinalizadosPorLapsoDeTiempo=false;
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
    this.turnosfinalizadosPorLapsoDeTiempo=false;
    this.verLog=false;
    this.turnosPorDia=false;
    this.turnosPorEspecialidad=false;

    this.chartOptions={
      title: {
        text:'Turnos por especialidad'
      },
      xAxis:{
        categories:['2/11','3/11'],
        title:{
          text:'Fechas'

        }
      },
      yAxis:{
        title:{
          text:'Cantidad de turnos'
        }

      },
      series:[{name:'algo', data:[1,2,3]},{name:'aaaalgo', data:[2,4,1]}],
      exporting: {
        showTable: true,
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

  }

  descargarPdf()
  {
    let id= document.getElementById('pdf');
    document.getElementById('pdf')?.addEventListener('click', function () {


  })
  }


}
