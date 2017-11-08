import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username = "";
  public password = "";

  constructor(public navCtrl: NavController, private alertController: AlertController, private loginProvider: LoginProvider) {

  }

  openLoginModal(){
    let loginModal = this.alertController.create({
      title: "Client Login",
      message: "Enter Your Credentials",
      inputs: [
        {
          type: "text",
          name: "Username"
        },
        {
          type: "password",
          name: "Password"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Login",
          handler: (inputData)=>{
            let username;
            let password;
            username = inputData.Username;
            password = inputData.Password;
            this.username = username.trim();
            this.password = password;
            this.loginProvider.customerLogin(this.username, this.password);
            //console.log(this.username);
          }
        }        
      ] 
    });
    loginModal.present();

  }

}
