import { Observable } from 'rxjs/Observable';
import { ConstantProvider } from './../constant/constant';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  private username = "";
  private password = "";
  private baseURL: string = "";

  constructor(
    private http: Http,
    private constant: ConstantProvider
    ) {}

  /**
   * Handles customer login
   *
   * @param username string
   * @param password string
   */
  customerLogin(username: string, password: string){
    this.username = username;
    this.password = password;
    // this.baseURL = this.constant.baseURL + 'findCustomerByName';
    this.baseURL = this.constant.findCustomerByName;
    let body = {
      username: this.username,
      password: this.password
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.baseURL, body, {headers: headers})
    .do(this.getLoginResponse)//You can delete the do function as it is not required
    .map(this.getExtractedData)
    .catch(this.getLoginError);
  }

  /**
   *
   * @param res The response object
   */
  private getLoginResponse(res: Response){
    console.log(res);
  }

  /**
   *
   * @param res The response object
   */
  private getExtractedData(res: Response){
    return res.json();
  }

  /**
   *
   * @param error The response object
   */
  private getLoginError(error: Response | any){
    return Observable.throw(error.status || "Server error.");
  }

}
