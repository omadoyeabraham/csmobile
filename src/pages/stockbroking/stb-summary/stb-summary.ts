import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StbSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stb-summary',
  templateUrl: 'stb-summary.html',
})
export class StbSummaryPage {

  chart: string = "stockPerformance";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  /**
   * Ionic calls this function after this page is successfully loaded
   */
  ionViewDidLoad() {
    // Initialize and draw the charts showing the user's portfolio performance and allocation
  }

}
