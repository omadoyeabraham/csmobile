import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Authentication service which provides different authentication related facilities to the csmobile application.
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */
@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
  }

  /**
   * Login the user
   *
   * @param username
   * @param password
   */
  login(username: string, password: string) :void {

  }

  /**
   * Logout the user
   */
  logout() {

  }

  /**
   * Get the authorization token which will be set as the `Authorization` header's value.
   * This token is needed to access protected API routes.
   *
   * @return string
   */
  getAuthorizationToken() {

  }

}
