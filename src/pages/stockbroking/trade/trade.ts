import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StbStore } from '../../../providers/stockbroking/stb-store';

/**
 * Generated class for the TradePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade',
  templateUrl: 'trade.html',
})
export class TradePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private stbStore: StbStore) {
  }

  ionViewDidLoad() {
  }

  /**
   * Migrate to the mandate page when a user clicks on the stock
   * @param security
   */
  goToMandatePage(security: string) {
    console.log(security)
  }

}
