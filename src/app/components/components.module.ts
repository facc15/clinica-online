
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';

import { SpinnerComponent } from './spinner/spinner.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { CarouselComponent } from './carousel/carousel.component';

import { ImagenDirective } from 'src/app/directivas/imagen.directive';
import { MouseDirective } from 'src/app/directivas/mouse.directive';
import { BotonDirective } from 'src/app/directivas/boton.directive';


@NgModule({
  declarations: [SpinnerComponent, CaptchaComponent, CarouselComponent,ImagenDirective,MouseDirective,BotonDirective],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,

  ],
  exports: [SpinnerComponent,CaptchaComponent,CarouselComponent,ImagenDirective,MouseDirective,BotonDirective]
})
export class ComponentsModule { }
