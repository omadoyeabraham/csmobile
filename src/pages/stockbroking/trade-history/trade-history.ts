import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ITradeOrder } from '../../../models/TradeOrderInterface';
import { StbStore } from '../../../providers/stockbroking/stb-store';
import { StockbrokingProvider } from '../../../providers/stockbroking/stb-service';

/**
 * Generated class for the TradeHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-history',
  templateUrl: 'trade-history.html',
})
export class TradeHistoryPage {

  tradeOrderStatus: string = "outstanding"

  /**
   * Class Instance Variables
   *
   */
  tradeOrders: ITradeOrder[]
  tradeOrdersByDate: Array<any>

  items = [1,2,3,4,5]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private stbStore: StbStore) {

    // this.stbStore.tradeOrdersSubject.subscribe(
    //   data => {
    //     this.tradeOrders = data
    //   }
    // )

    // this.stbStore.tradeOrdersGroupedByDateSubject.subscribe(
    //   data => {
    //     this.tradeOrdersByDate = data
    //     console.log(this.tradeOrdersByDate)
    //   }
    // )
  }

  ionViewDidLoad() {
    this.stbStore.tradeOrdersSubject.subscribe(
      data => {
        this.tradeOrders = data
      }
    )

    this.stbStore.tradeOrdersGroupedByDateSubject.subscribe(
      data => {
        this.tradeOrdersByDate = data
        console.log(this.tradeOrdersByDate)
      }
    )
  }

  ngOnChanges(changes) {
    console.log(changes)
  }

  toggleTradeOrder(i, j) {

  }

}
