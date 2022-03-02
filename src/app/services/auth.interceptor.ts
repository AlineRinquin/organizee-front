import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
      if(token) {

      const authReq = request.clone(
        {
          headers : request.headers.set('Authorization', `Bearer ${token}`)
        }
        )
        return next.handle(authReq);
    } else {
    return next.handle(request);
  }
}
}
