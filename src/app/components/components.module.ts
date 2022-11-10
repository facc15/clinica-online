import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';

import { SpinnerComponent } from './spinner/spinner.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { CarouselComponent } from './carousel/carousel.component';



@NgModule({
  declarations: [SpinnerComponent, CaptchaComponent, CarouselComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule
  ],
  exports: [SpinnerComponent,CaptchaComponent,CarouselComponent]
})
export class ComponentsModule { }
