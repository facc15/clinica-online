import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[mouseDirectiva]'
})
export class MouseDirective {

  constructor() { }

  @HostBinding('style.color') color = 'white';
  @HostBinding('style.textShadow') sombra = '1px';
  @HostBinding('style.fontSize') size = '15px';
  @HostBinding('style.fontWeight') weight = 'normal';

  @HostListener('mouseenter') mouseHover(eventData: Event) {
    this.color = '#008F39';
    this.sombra='0px 20px 7px #008F39';
    this.size = '20px';
    this.weight='bolder';
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.color = 'white';
    this.sombra='0px 20px 7px white';
    this.size = '15px';
    this.weight='normal';
  }

}
