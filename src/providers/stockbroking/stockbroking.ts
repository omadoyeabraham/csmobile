import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StockbrokingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StockbrokingProvider {

  constructor(public http: Http) {
    console.log('Hello StockbrokingProvider Provider');
  }

}
