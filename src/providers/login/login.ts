import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  private username = "";
  private password = "";

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  customerLogin(username: string, password: string){
    this.username = username;
    this.password = password;

    console.log(this.username);
    console.log(this.password);
  }

}
