import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fichierTypeFilter' })
export class FichierTypeFilterPipe implements PipeTransform {

  transform(list: any[], filterType: {id: number}[], changeIndicator: number): any {
      if(!(filterType && filterType.length) ){
          return list ? list : [];
      }
    return list ? list.filter(item => (item.upload && item.upload.state != 'Done') || filterType.map(element=>element.id).includes(item.type_id)) : [];
  }
}
