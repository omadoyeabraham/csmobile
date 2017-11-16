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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.StbSummaryPage = 'StbSummaryPage';
    this.PortfolioHoldingsPage = 'PortfolioHoldingsPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StbPage');
  }

}
