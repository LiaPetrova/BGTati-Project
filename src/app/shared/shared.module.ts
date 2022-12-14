import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './util/shorten.pipe';
import { TransformDatePipe } from './util/transform-date.pipe';
import { TimeAgoPipe } from './util/time-ago.pipe';




@NgModule({
  declarations: [ShortenPipe, TransformDatePipe, TimeAgoPipe],
  imports: [
    CommonModule
  ],
  exports:[
    ShortenPipe,
    TransformDatePipe,
    TimeAgoPipe
  ]
})
export class SharedModule { }
