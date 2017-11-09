import { FixedIncomeProvider } from './../fixed-income/fixed-income';
import { CustomerProvider } from './../customer/customer';
import { ConstantProvider } from './../constant/constant';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
  private baseURL: string = "";

  constructor(
    public http: Http, 
    private constant: ConstantProvider, 
    private customer: CustomerProvider,
    private fixedIncome: FixedIncomeProvider
) {
    console.log('Hello LoginProvider Provider');
  }

  customerLogin(username: string, password: string){
    this.username = username;
    this.password = password;
    this.baseURL = this.constant.baseURL + 'findCustomerByName';
    let body = {
      username: this.username,
      password: this.password
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.baseURL, body, {headers: headers})
    .map(res => res.json())
    .subscribe(data => {
      //console.log(data);
      this.customer.setCustomerData(data['customer']);
      this.fixedIncome.setFIData(data['FI']);
      console.log(this.customer.getCustomerData());
    });

    console.log(this.username);
    console.log(this.password);
    console.log(this.constant.baseURL + 'findCustomerByName');
  }

}
