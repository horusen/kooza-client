import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Helper } from 'src/app/helpers/helper/helper';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(public router: Router, public helper: Helper) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          console.log(error);

          if (error.status == 403) {
            // this.router.navigate(['./']);
            console.log('YEAH');

            this.helper.notification.toastDanger(
              "Vous n'êtes pas autorisé a effectuer cette action."
            );
          }
        },
      })
    );
  }
}
