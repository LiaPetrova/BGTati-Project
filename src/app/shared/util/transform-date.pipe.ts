import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  transformedDate!: Date;

  transform(timestampObject: any): any {
    this.transformedDate = timestampObject.toDate();
    return this.transformedDate;
  };
}
