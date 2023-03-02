import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string, changeIndicator: number): any {
    return list ? list.filter(item => (item.upload && item.upload.state != 'Done') || item.libelle.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}
