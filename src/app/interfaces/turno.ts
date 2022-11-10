import { Fecha } from 'src/app/clases/fecha';
import { HistoriaClinica } from './historia-clinica';
export interface Turno {
  fecha: Fecha;
  estado: string;
  uidEspecialista: string;
  especialista: string;
  especialidad: string;
  uidPaciente: string;
  paciente: string;
  resenia: string;
  id: string;
  pregunta1:string;
  respuesta1:string;
  pregunta2:string;
  respuesta2:string;
  calificacion: string;
  devolucion: string;
  calificando: boolean;
  historiaClinica: HistoriaClinica;

}

