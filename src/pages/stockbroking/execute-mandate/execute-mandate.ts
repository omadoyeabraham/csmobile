import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StbStore } from '../../../providers/stockbroking/stb-store'

/**
 * Generated class for the ExecuteMandatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-execute-mandate',
  templateUrl: 'execute-mandate.html',
})
export class ExecuteMandatePage {

  private tradeOrder

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private stbStore: StbStore) {

      this.tradeOrder = this.stbStore.previewedTradeOrderSubject.getValue()
  }

  ionViewDidLoad() {
  }

}
