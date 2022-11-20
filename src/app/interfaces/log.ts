import { Usuario } from './../clases/usuario';
export interface Log {

  usuario: Usuario;
  dia: string;
  hora: string;
  mes: string;
  minuto: string;
}

export interface Data{

  name: string;
  data: number[];

}
