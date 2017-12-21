import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  private customer: any;
  private customerData: any;
  public firstName: string;
  public lastName: string;
  public middleName: string;
  public customerLabel: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewController: ViewController,
   ) {
    this.customerData = navParams.get('customerData');
    this.customer = this.customerData['customer'];

    this.firstName = this.customer['firstName'];
    this.lastName = this.customer['lastName'];
    this.middleName = this.customer['middleName'];
    this.customerLabel = this.customer['label'];

  }

  ionViewDidLoad() {

  }

  continueToDashboard(){
    this.navCtrl.setRoot('DashboardPage', {customerData: this.customerData});
  }

  backToLoginPage(){
    this.viewController.dismiss();
  }

}
