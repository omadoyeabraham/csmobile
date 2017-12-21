import { Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConstantProvider } from '../constant/constant';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage/es2015/storage';
/**
 * Authentication service which provides different authentication related facilities to the csmobile application.
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */
@Injectable()
export class AuthProvider {

  constructor(public http: Http,
              public constants: ConstantProvider,
              public storage: Storage) {
  }

  /**
   * Login the user
   *
   * @param username
   * @param password
   */
  login(username: string, password: string) :Observable<any> {
    let credentials = {
      username: username,
      password: password
    }

    return this.http.post(this.constants.findCustomerByNameUrl, credentials)
                          .map((response) => response.json())

  }


  /**
   * Get the authorization token which will be set as the `Authorization` header's value.
   * This token is needed to access protected API routes.
   *
   * @return string
   */
  getAuthorizationToken() {
    return this.storage.get('token')
  }

}
