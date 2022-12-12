import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './util/shorten.pipe';
import { TransformDatePipe } from './util/transform-date.pipe';




@NgModule({
  declarations: [ShortenPipe, TransformDatePipe],
  imports: [
    CommonModule
  ],
  exports:[
    ShortenPipe,
    TransformDatePipe
  ]
})
export class SharedModule { }
