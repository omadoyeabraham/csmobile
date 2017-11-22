import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  selectedPortfolioIndex: number = 1;
  numberOfPortfolios: number = 3;

  // The initial tab of holdings shown
  holdingType: string = "stocks";

  tests = [1,2,3,4,5,6,7];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortfolioHoldingsPage');
  }

  /**
   * Handle the event emitted by the portfolio switching component when the user changes their portfolio
   *
   * @param data
   */
  onPortfolioChange(data) {
    this.selectedPortfolioIndex = data.currentPortfolio
    this.numberOfPortfolios = data.numberOfPortfolios
  }

}
