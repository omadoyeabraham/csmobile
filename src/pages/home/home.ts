import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username = "";
  public password = "";

  constructor(private loginModal: ModalController) {

  }

  /**
   * Open the login modal page
   */
  openLoginModal(){
    let loginPage = this.loginModal.create('LoginPage');
    loginPage.present();
  }

}
