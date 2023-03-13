import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HelperNotification {
  alertSuccess(): void {
    Swal.fire({
      icon: 'success',
      title: 'Done successfully',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  alertDanger(word: string = 'ERREUR'): void {
    Swal.fire({
      icon: 'error',
      title: word,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  confirm(callback: Function) {
    const options = {
      title: 'Êtes vous sûre?',
      // text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non, quitter',
    };

    Swal.fire({ ...options }).then((result) => {
      if (result.value) {
        callback();
      }
    });
  }

  toastSuccess(word?: string): void {
    Swal.fire({
      icon: 'success',
      position: 'top-end',
      title: word || 'Succesfully done',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      allowEscapeKey: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }

  toastDanger(message: string, fromServer: boolean = false): void {
    let options: SweetAlertOptions = {
      icon: 'error',
      position: 'top-end',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      allowEscapeKey: true,
    };

    if (fromServer) options.footer = 'Erreur Serveur';

    Swal.fire({
      ...options,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }
}
