import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username = "";
  public password = "";

  constructor(private navController: NavController) {

  }

  /**
   * Open the login modal page
   */
  openLoginModal(){
    this.navController.push('LoginPage');
  }

}
