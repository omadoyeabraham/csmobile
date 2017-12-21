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

  getTradeOrderTerms() {
    return this.http.get(this.constants.getTradeOrderTermsUrl)
  }

  /**
   * Get the list of securities tradeable on the floor of the NSE.
   */
  getSecurityNames() {
    return this.http.get(this.constants.getSecurityNames)
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
    let tradeOrderDates = []
    let count = 0

    tradeOrders.forEach((tradeOrder) => {
      let tradeOrderDate = tradeOrder.orderDate
      tradeOrderDate = moment(tradeOrderDate).format('ddd MMM DD YYYY')

      // Check if an order on the current date has already been sorted
      if(tradeOrderDates[tradeOrderDate]) {
        groupedTradeOrders[tradeOrderDates[tradeOrderDate]].push(tradeOrder)

      } else {
        // Set so we can track the array index where tradeOrders of a particular date are stored
        tradeOrderDates[tradeOrderDate] = count

        // Set so we have access to the date for a particular group of trade orders
        groupedTradeOrders[count] = [{
          date: tradeOrderDate
        }]

        groupedTradeOrders[count].push(tradeOrder)

        // Increment count for when a group of tradeOrders are created
        count = count + 1
      }

    })

    return groupedTradeOrders
  }

  /**
   * Preview a trade order and get the fees & total cost from zanibal
   * @param tradeOrder
   */
  previewTradeOrder(tradeOrder: ITradeOrder) {
    return this.http.post(this.constants.previewTradeOrderUrl, tradeOrder)
  }

  /**
   * Execute a trade order on the floor of the NSE
   *
   * @param {ITradeOrder} tradeOrder
   * @returns
   * @memberof StockbrokingProvider
   */
  executeTradeOrder(tradeOrder: ITradeOrder) {
    return this.http.post(this.constants.executeTradeOrderUrl, tradeOrder)
  }

  /**
   * Http call to get market data
   *
   * @memberof StockbrokingProvider
   */
  getMarketData() {
    return this.http.get(this.constants.marketDataUrl)
  }

}
