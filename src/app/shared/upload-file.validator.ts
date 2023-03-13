import { FormControl } from '@angular/forms';

export function requiredFileType( type: string | string[] ) {
  return function ( control: FormControl ) {

    if(typeof type == 'string')
    {
        type = [type];
    }

    const file = control.value;
    if ( file && file.name ) {
      const extension = file.name.split('.')[1].toLowerCase();
      for(let item of type)
      {
        if ( item.toLowerCase() === extension.toLowerCase() ) {
            return null;
        }
      }
      return {
        requiredFileType: true
      };
    }

    return null;
  };
}