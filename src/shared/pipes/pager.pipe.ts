import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pager'
})
export class PagerPipe implements PipeTransform {
  transform(arr: any[], page: number, pageSize: number) {
    if(!arr) {
      return [];
    }
    --page;
    return arr.slice(page * pageSize, (page + 1) * pageSize);
  }
}