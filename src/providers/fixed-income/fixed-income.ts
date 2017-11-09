import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FixedIncomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FixedIncomeProvider {

  private fiData: any;

  constructor(public http: Http) {
    console.log('Hello FixedIncomeProvider Provider');
  }

  setFIData(fiData: any){
    this.fiData = fiData;
  }

  getFIData(){
    return this.fiData;
  }

}
