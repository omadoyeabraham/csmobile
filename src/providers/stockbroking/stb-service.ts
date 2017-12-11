import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConstantProvider } from '../constant/constant';
import { ITradeOrder } from '../../models/TradeOrderInterface';

/**
 * Service which provides access to the API for stockbroking related actions
 *
 * @export
 * @class StockbrokingProvider
 */
@Injectable()
export class StockbrokingProvider {

  constructor(private http: Http,
              private constants: ConstantProvider) {
  }

  /**
   * Get the stockbroking trade orders for the user
   *
   */
  getTradeOrders(userID: number, cacheStatus: number) {
    return this.http.get(`${this.constants.getTradeOrdersUrl}/${userID}/${cacheStatus}`)
  }

}
