import { Especialidades } from './../interfaces/especialidades';
export class Usuario {

  public uid:string;
  public nombre:string;
  public apellido:string;
  public edad:number;
  public dni:number;
  public correo:string;
  public pass:string;
  public pathPerfil:string;
  public perfil: string;

  constructor(uid:string,nombre:string,apellido:string,dni:number,edad:number,correo:string,pass:string,fotoPath:string,perfil:string)
  {
    this.uid=uid;
    this.nombre=nombre;
    this.apellido=apellido;
    this.edad=edad;
    this.dni=dni;
    this.correo=correo;
    this.pass=pass;
    this.pathPerfil=fotoPath;
    this.perfil=perfil;
  }
}

export class Paciente extends Usuario{

  public obraSocial: string | undefined;

  public pathPerfil2:string;

  constructor(uid:string,nombre:string,apellido:string,dni:number,edad:number,correo:string,pass:string,fotoPath:string,fotoPath2:string,perfil:string,obraSocial?:string)
  {
    super(uid,nombre,apellido,dni,edad,correo,pass,fotoPath,perfil);
    this.obraSocial=obraSocial;
    this.pathPerfil2=fotoPath2;
  }
}


export class Especialista extends Usuario{

  public especialidades!: Especialidades[];
  public verificacionAdmin: boolean;
  public id!: string|undefined;
  public horarios: string;

  constructor(uid:string,nombre:string,apellido:string,dni:number,edad:number,correo:string,pass:string,fotoPath:string,perfil:string,especialidad?:string,id?:string)
  {
    super(uid,nombre,apellido,dni,edad,correo,pass,fotoPath,perfil);
    this.verificacionAdmin=false;
    this.id=id;
    this.especialidades=[];
    this.horarios="13:00 a 16:00 hs";
  }
}

export class Administrador extends Usuario{

  constructor(uid:string,nombre:string,apellido:string,dni:number,edad:number,correo:string,pass:string,fotoPath:string,perfil:string)
  {
    super(uid,nombre,apellido,dni,edad,correo,pass,fotoPath,perfil);
  }
}

