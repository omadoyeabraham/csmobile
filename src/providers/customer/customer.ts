import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerProvider {

  private customerData: any;

  constructor(public http: Http) {
    console.log('Hello CustomerProvider Provider');
  }

  setCustomerData(customerData: any){
    this.customerData = customerData;
  }

  getCustomerData(){
    return this.customerData;
  }


}
