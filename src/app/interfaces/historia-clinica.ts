export interface HistoriaClinica {

  altura:string;
  peso: string;
  temperatura: string;
  presion: string;
  datoDinamico1: DatoDinamico;
  datoDinamico2: DatoDinamico;
  datoDinamico3: DatoDinamico;
  informe: string;

}

export interface DatoDinamico
{
  clave: string;
  valor: string;
}
