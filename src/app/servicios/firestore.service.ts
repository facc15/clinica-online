import { Log } from './../interfaces/log';
import { FechaService } from './fecha.service';
import { Usuario, Paciente, Especialista, Administrador } from './../clases/usuario';
import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { FirebaseStorage, getDownloadURL, getStorage, listAll, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Especialidades } from '../interfaces/especialidades';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private paciente: Paciente;
  private especialista: Especialista;
  private administrador!: Administrador;
  public listaUsuarios: Usuario[];

  public file:any;
  public file2:any;
  public refImagen: any;
  public imagenes: string[];

  constructor(private firestore: Firestore,private storage: Storage,private fechaService: FechaService)
  {
    this.paciente=new Paciente('','','',0,0,'','','','','','');
    this.especialista=new Especialista('','','',0,0,'','','','');

    this.imagenes=[];
    this.listaUsuarios=[];
    try {
      this.obtenerUsuarios().subscribe(res=>{
        this.listaUsuarios=res;

      });

    } catch (error) {

    }

  }

  async agregarColeccionEspecialidad(especialidad: Especialidades)
  {
    const place= collection(this.firestore,'Especialidades');
    addDoc(place,{
      especialidad: especialidad
    });
  }

  async agregarColeccionUsuario(usuario: Usuario)
  {
    if(usuario.perfil=="paciente")
    {
      this.paciente= <Paciente>usuario;

      const place= collection(this.firestore,'Usuarios');

      addDoc(place,{
        uid: this.paciente.uid,
        nombre: this.paciente.nombre,
        apellido: this.paciente.apellido,
        edad: this.paciente.edad,
        dni: this.paciente.dni,
        correo: this.paciente.correo,
        obraSocial: this.paciente.obraSocial,
        pathPerfil: this.paciente.pathPerfil,
        pathPerfil2: this.paciente.pathPerfil2,
        perfil: this.paciente.perfil
      });
      this.subirImagen(this.file,this.paciente.pathPerfil);
      this.subirImagen(this.file2,this.paciente.pathPerfil2);

    }else if(usuario.perfil=='especialista')
    {

      this.especialista= <Especialista>usuario;
      const place= collection(this.firestore,'Usuarios');

      const ref= await setDoc(doc(this.firestore,'Usuarios',this.especialista.uid),{
        uid: this.especialista.uid,
        nombre: this.especialista.nombre,
        apellido: this.especialista.apellido,
        edad: this.especialista.edad,
        dni: this.especialista.dni,
        verificacionAdmin: this.especialista.verificacionAdmin,
        correo: this.especialista.correo,
        especialidades: this.especialista.especialidades,
        horarios: this.especialista.horarios,
        pathPerfil: this.especialista.pathPerfil,
        perfil: this.especialista.perfil
      }).catch(error=>console.log(error));

      this.subirImagen(this.file,this.especialista.pathPerfil);
    }else if(usuario.perfil=='administrador')
    {
      this.administrador= <Administrador>usuario;
      const place= collection(this.firestore,'Usuarios');

      const ref= await setDoc(doc(this.firestore,'Usuarios',this.administrador.uid),{
        uid: this.administrador.uid,
        nombre: this.administrador.nombre,
        apellido: this.administrador.apellido,
        edad: this.administrador.edad,
        dni: this.administrador.dni,
        correo: this.administrador.correo,
        pathPerfil: this.administrador.pathPerfil,
        perfil: this.administrador.perfil
      }).catch(error=>console.log(error));

      this.subirImagen(this.file,this.administrador.pathPerfil);
    }

  }

  ingresarLog(usuario: Usuario)
  {
    const place= collection(this.firestore,'Logs');

    const fecha = this.fechaService.obtenerFechaLog();

      addDoc(place,{
        usuario: usuario,
        dia:  fecha.dia,
        hora: fecha.hora,
        mes: fecha.mes,
        minuto: fecha.minuto
      });

  }

  obtenerLogs() : Observable<Log[]>
  {
    const ref= collection(this.firestore,'Logs');
    return collectionData(ref,{idField: 'id'}) as Observable<Log[]>;
  }



    async actualizarEspecialista(especialista:Especialista) {


      const placeRef = doc(this.firestore,"Usuarios",especialista.uid);
      await updateDoc(placeRef, { verificacionAdmin: true} );
    }



  async obtenerEspecialistas()
  {
    const ref= collection(this.firestore,'Usuarios');
    const q= query(ref, where("perfil", "==", "especialista"));
    return await getDocs(q);

  }


  obtenerEspecialidades() : Observable<Especialidades[]>
  {
    const ref= collection(this.firestore,'Especialidades');
    return collectionData(ref,{idField: 'id'}) as Observable<Especialidades[]>;
  }


  obtenerUsuarios(): Observable<Usuario[]>
  {
    const ref= collection(this.firestore,'Usuarios');
    return collectionData(ref,{idField: 'id'}) as Observable<Usuario[]>;
  }


  subirImagen(file: any,path:string)
  {
    const imgRef= ref(this.storage,"Fotos/"+path);

    uploadBytes(imgRef,file)
    .then(res=>console.log(res))
    .catch(error=>console.log(error));
  }

  async traerFotos()
  {
    this.refImagen= ref(this.storage,'Fotos');
   return await listAll(this.refImagen);

  }

  async traerFotosEspecialidades()
  {
    this.refImagen= ref(this.storage,'Especialidades');
   return await listAll(this.refImagen);

  }


}


