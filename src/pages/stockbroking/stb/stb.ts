import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the StbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // The various components are lazy-loaded by ionic using strings. This improves the apps performance.
    this.StbSummaryPage = 'StbSummaryPage';
    this.PortfolioHoldingsPage = 'PortfolioHoldingsPage';
    this.TradePage = 'TradePage';
    this.TradeHistoryPage = 'TradeHistoryPage';
    this.WatchlistPage = 'WatchlistPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StbPage');
  }

}
