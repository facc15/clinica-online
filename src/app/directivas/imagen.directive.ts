import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[imagenDirectiva]'
})
export class ImagenDirective {

  @Input('tipoImagen') public tipoImagen:string;

  constructor(private elementRef: ElementRef)
  {
    this.tipoImagen="";

  }

  @HostListener('error')
  cambiarImagenPorDefecto()
  {
    let element=this.elementRef.nativeElement;

    switch (this.tipoImagen)
    {
      case '':
          element.src='../../assets/ico-login.png';
          element.style.backgroundColor ='white';
        break;
      case 'especialidad':
        element.src='../../assets/cruz.jpg';
      break;
      case 'perfilPaciente':
        element.src='../../assets/paciente.png';
        element.style.backgroundColor ='yellow';
        break;
        case 'perfilEspecialista':
          element.src='../../assets/especialista.png';
          element.style.backgroundColor ='#ffe3e8';
          break;
        case 'perfilAdministrador':
          element.src='../../assets/administrador.png';
          element.style.backgroundColor ='light-gray';
          break;
      default:
        break;
    }
  }

}
