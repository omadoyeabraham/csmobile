import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

/**
 * Generated class for the SidemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 export interface PageInterface{
   title: string;
   pageName: string;
   icon: string;
 }


@IonicPage()
@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html',
})
export class SidemenuPage {

  rootPage = "DashboardPage";
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    {title: 'Dashboard', pageName: 'DashboardPage', icon: 'home'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SidemenuPage');
  }

}
