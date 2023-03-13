import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectedSort' })
export class SelectedSortPipe implements PipeTransform {

  transform(list: any[], filterText: number[]): any {
    return list ? list.sort(
      (obj1, obj2) => {
        if (filterText.includes(obj1.id) && !filterText.includes(obj2.id)) {
            return -1;
        }

        if (filterText.includes(obj2.id) && !filterText.includes(obj1.id)) {
          return 1;
        }

        return 0;
    }
    ) : [];
  }
}
