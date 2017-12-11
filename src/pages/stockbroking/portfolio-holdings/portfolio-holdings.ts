import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StbStore } from '../../../providers/stockbroking/stb-store';
import { StbGetters } from '../../../providers/stockbroking/stb-getters';
import { IPortfolio } from '../../../models/PortfolioInterface';
import { IPortfolioHolding } from '../../../models/PortfolioHoldingInterface';

/**
 * Generated class for the PortfolioHoldingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio-holdings',
  templateUrl: 'portfolio-holdings.html',
})
export class PortfolioHoldingsPage {

  // The initial tab of holdings shown
  holdingType: string = "stocks";

  tests = [1,2,3,4,5,6,7];

  /**
   * Class instance variables
   */
  currentPortfolio: IPortfolio
  stockHoldings: IPortfolioHolding[]
  bondHoldings: IPortfolioHolding[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public stbStore: StbStore,
              public stbGetters: StbGetters) {

    this.stbStore.currentPortfolioSubject.subscribe(
      data => {
        this.currentPortfolio = data
        this.stockHoldings = this.stbGetters.getCurrentPortfolioStockHoldings()
        this.bondHoldings = this.stbGetters.getCurrentPortfolioBondHoldings()
      }
    )
  }

  ionViewDidLoad() {
    this.stbStore.currentPortfolioSubject.subscribe(
      data => {
        this.currentPortfolio = data
        this.stockHoldings = this.stbGetters.getCurrentPortfolioStockHoldings()
        this.bondHoldings = this.stbGetters.getCurrentPortfolioBondHoldings()
      }
    )
  }


}
