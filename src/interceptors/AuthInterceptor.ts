/**
 * Interceptor class which intercepts all outgoing requests from the application, and sets the `Authorization` header with the token returned upon successful authentication of a user.
 *
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../providers/auth/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthProvider){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // // Get the auth header from the service.
    // const authHeader = this.auth.getAuthorizationToken()

    // Clone the request to add the new header.
    // console.log(`Token was set to ${this.auth.getAuthorizationToken()}`)
    // const authReq = req.clone({ headers: req.headers.set('Authorization', this.auth.getAuthorizationToken()) });

    const authReq = req.clone({ headers: req.headers.set('Authorization', localStorage.getItem('auth_token')) });

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
