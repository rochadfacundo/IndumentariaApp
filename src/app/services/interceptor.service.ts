import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _spinner:SpinnerService) 
  {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._spinner.show();
    return next.handle(req).pipe(
      finalize(()=>{
        this._spinner.hide();
      })
    )
  }

}
