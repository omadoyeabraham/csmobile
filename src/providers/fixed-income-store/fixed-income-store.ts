import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FixedIncomeStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FixedIncomeStoreProvider {

  constructor(public http: Http) {
    console.log('Hello FixedIncomeStoreProvider Provider');
  }

}
