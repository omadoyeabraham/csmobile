import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ITradeOrder } from '../../../models/TradeOrderInterface';
import { StbStore } from '../../../providers/stockbroking/stb-store';
import { StbGetters } from '../../../providers/stockbroking/stb-getters';

/**
 * Generated class for the TradeHistoryPage page.
 *
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
  private lastToggledDiv: any
  public tradeOrders: any
  public outstandingTradeOrders: any

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private stbStore: StbStore,
              public stbGetters: StbGetters) {
  }

  ionViewDidLoad() {
    this.stbStore.currentPortfolio.subscribe(
      data => {
        this.tradeOrders = this.stbGetters.getCurrentPortfolioTradeOrdersGroupedByDate()
        this.outstandingTradeOrders = this.stbGetters.getCurrentPortfolioOutstandingTradeOrdersGroupedByDate()
        console.log(this.tradeOrders, this.outstandingTradeOrders)
      }
    )
  }

  /**
   * Used to toggle the visibility of a TradeOrder's details when it is clicked on
   */
  toggleTradeOrderDisplay($event) {
    let tradeOrderDiv = $event.srcElement
    tradeOrderDiv = tradeOrderDiv.parentNode.parentNode.parentNode

    // A div has been clicked on
    if (this.lastToggledDiv) {

      if(this.lastToggledDiv === tradeOrderDiv){
        this.lastToggledDiv.classList.toggle('showDetails')
      }else {
        this.lastToggledDiv.classList.remove('showDetails')
        tradeOrderDiv.classList.toggle('showDetails')
      }
    } else {
      // No Div previously clicked on
      tradeOrderDiv.classList.toggle('showDetails')
    }

    this.lastToggledDiv = tradeOrderDiv

  }

}
