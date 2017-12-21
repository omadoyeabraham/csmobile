import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FixedIncomeStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FixedIncomeStoreProvider {

  public userFiDataSubject = new BehaviorSubject<any>([])
  public userFiData = this.userFiDataSubject.asObservable()

  constructor(public http: Http,
              public storage: Storage) {
  }

  /**
   * Get and broadcast already stored fixed-income on page reload
   *
   * @memberof FixedIncomeStoreProvider
   */
  broacastOldValues() {
    this.storage.get('fixed-income-userData').then((fiUserData) => {
      this.userFiDataSubject.next(fiUserData)
    })
  }

  /**
   * Store and emit the fixed income data
   *
   * @param {*} fiData
   * @memberof FixedIncomeStoreProvider
   */
  storeFixedIncomeData(customerData: any) {
    const fixedIncomeData = customerData.FI

    this.userFiDataSubject.next(fixedIncomeData)
    this.storage.set('fixed-income-userData', fixedIncomeData)
  }

}
