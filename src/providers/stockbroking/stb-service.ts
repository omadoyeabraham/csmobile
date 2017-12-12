import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConstantProvider } from '../constant/constant';
import { ITradeOrder } from '../../models/TradeOrderInterface';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'


/**
 * Service which provides access to the API for stockbroking related actions
 *
 * @export
 * @class StockbrokingProvider
 */
@Injectable()
export class StockbrokingProvider {

  constructor(private http: HttpClient,
              private constants: ConstantProvider) {
  }

  /**
   * Get the stockbroking trade orders for the user
   *
   */
  getTradeOrders(userID: number, cacheStatus: number) {
    return this.http.get(`${this.constants.getTradeOrdersUrl}/${userID}/${cacheStatus}`)
  }

  /**
   * Determine if a trade order can be cancelled or not.
   *
   * @param {ITradeOrder} tradeOrder
   * @returns {boolean}
   * @memberof StockbrokingProvider
   */
  determineIfTradeOrderCanBeCancelled(tradeOrder: ITradeOrder) :boolean {
    return tradeOrder.orderStatus == "BOOKED" ||
      (tradeOrder.fixOrderStatus == "NEW" && tradeOrder.orderStatus == "EXECUTING") ||
      (tradeOrder.fixOrderStatus == "REPLACED" && tradeOrder.orderStatus == "EXECUTING") ||
      (tradeOrder.fixOrderStatus == "REJECTED" && tradeOrder.orderStatus == "EXECUTING") ||
      (tradeOrder.fixOrderStatus == "NA" && tradeOrder.orderStatus == "EXECUTING")
  }

  /**
   *  Determine if a trade order has been booked
   *
   * @param {ITradeOrder} tradeOrder
   * @returns {boolean}
   * @memberof StockbrokingProvider
   */
  determineIfTradeOrderIsBooked(tradeOrder: ITradeOrder) :boolean {
    return tradeOrder.orderStatus == "BOOKED" ||
      (tradeOrder.fixOrderStatus == "NA" && tradeOrder.orderStatus == "EXECUTING") ||
      (tradeOrder.fixOrderStatus == "REJECTED" && tradeOrder.orderStatus == "EXECUTING")
  }

  getTradeOrderCspStatus(tradeOrder: ITradeOrder) :string {
    if ((tradeOrder.orderStatus == "EXECUTING") && (tradeOrder.fixOrderStatus == "PARTIALLY_FILLED")) {
      return 'PARTIALLY FILLED'
    }

    if (((tradeOrder.fixOrderStatus == 'NEW') || (tradeOrder.fixOrderStatus == 'REPLACED')) && (tradeOrder.orderStatus == 'EXECUTING')) {
      return 'EXECUTING'
    }

    if (tradeOrder.isBooked) {
      return 'PENDING'
    }

    if ((tradeOrder.orderStatus == "EXECUTING") && (tradeOrder.fixOrderStatus == "FILLED")) {
      return "EXECUTED"
    }

    return tradeOrder.orderStatus
  }

  /**
   * Group the user's trade orders by the date of the trade order
   *
   */
  groupTradeOrdersByDate(tradeOrders: ITradeOrder[]) {
    let groupedTradeOrders = []

    tradeOrders.forEach((tradeOrder) => {
      let tradeOrderDate = tradeOrder.orderDate
      tradeOrderDate = moment(tradeOrderDate).format('ddd MMM DD YYYY')

      if(groupedTradeOrders[tradeOrderDate]) {
        groupedTradeOrders[tradeOrderDate].push(tradeOrder)
      } else {
        groupedTradeOrders[tradeOrderDate] = []
        groupedTradeOrders[tradeOrderDate].push(tradeOrder)
      }

    })
    //console.log(groupedTradeOrders)
    return groupedTradeOrders
  }

}
