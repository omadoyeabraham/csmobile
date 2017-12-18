import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StbStore } from '../../../providers/stockbroking/stb-store';


/**
 *This STB Page is the parent/wrapper page for all other stockbroking pages
 *
 */

@IonicPage()
@Component({
  selector: 'page-stb',
  templateUrl: 'stb.html',
})
export class StbPage {

  StbSummaryPage: any;
  PortfolioHoldingsPage: any;
  TradePage: any;
  TradeHistoryPage: any;
  WatchlistPage: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public stbStore: StbStore) {

    // The various components are lazy-loaded by ionic using strings. This improves the apps performance.
    this.StbSummaryPage = 'StbSummaryPage';
    this.PortfolioHoldingsPage = 'PortfolioHoldingsPage';
    this.TradePage = 'TradePage';
    this.TradeHistoryPage = 'TradeHistoryPage';
    this.WatchlistPage = 'WatchlistPage';

    // Ensure that old values already gotten (if applicable) is rebroadcast to all observers
    this.stbStore.broadcastOldValues()
  }

  ionViewDidLoad() {}

}
