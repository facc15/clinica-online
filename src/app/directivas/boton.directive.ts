import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[botonDirectiva]'
})
export class BotonDirective implements OnInit {

  constructor(private elementRef: ElementRef) {

   }

  @HostBinding('style.color') color = 'black';
  @HostBinding('style.backgroundColor') backgroundColor = 'white';


  ngOnInit(): void {
    let element=this.elementRef.nativeElement;

    element.style.backgroundColor=this.getColor();
    element.style.color=this.getColor();
    element.style.borderRadius='100%';
    element.style.borderStyle= 'inset';

  }

  @HostListener('click') clickColor(eventData: Event) {
    this.color = this.getColor();
    this.backgroundColor= this.getColor();
  }


  getColor()
  {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = "rgb(" + r + "," + g + "," + b + ")"
    return color;
  }






}
