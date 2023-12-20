import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'onlyBoolean' })
export class BooleanPipe implements PipeTransform {
  transform(value: boolean | null): boolean {
    return value !== null && value;
  }
}
