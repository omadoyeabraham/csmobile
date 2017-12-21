import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { StbGetters } from '../../providers/stockbroking/stb-getters';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.html',
})
export class DashboardPage {

  private customerData: any;
  private totalStbValue: number

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private stbGetter: StbGetters) {

    this.customerData = navParams.get('customerData');
    this.totalStbValue = this.stbGetter.getTotalStbValue()
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
   //this.menuController.enable(true, "mycontent");
  }

  /**
   * Navigate to various pages using ionic's nav controller
   *
   * @param pageName String use by angular to lazyload the page component
   */
  goToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }


}
