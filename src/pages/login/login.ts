// import { StatusBar } from '@ionic-native/status-bar';
import { LoginProvider } from './../../providers/login/login';
import { ConstantProvider } from './../../providers/constant/constant';
import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public formGroup: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;

  constructor(
    private viewController: ViewController, 
    private formBuilder: FormBuilder,
    private loginProvider: LoginProvider,
    private constant: ConstantProvider,
    private welcomeModal: ModalController,
    private loadingController: LoadingController
  ) {
    this.formGroup = this.formBuilder.group(
      {
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = this.formGroup.controls['username'];
    this.password = this.formGroup.controls['password'];
  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   /**
   * Close the Login Modal page
   */
  closeLoginPage(){
    this.viewController.dismiss();
  }

  /**
   * 
   */
  loginUser(){
    let loader = this.loadingController.create({
      content: this.constant.loginLoadingMessage
    });
    loader.present();

    let username = this.username.value;
    let password = this.password.value;
    this.loginProvider.customerLogin(username.trim(), password.trim()).subscribe(data => {
      let welcomePage = this.welcomeModal.create('WelcomePage', {customerData: data});
      welcomePage.present();
      loader.dismiss();
    },
    err => {
      if(err === 401){
            this.constant.getToastMessage(this.constant.toastMessagePasswordMismatch);
          }

      if(err === null){
            this.constant.getToastMessage(this.constant.toastMessageNetworkError);
          }
          loader.dismiss(); 
    });
  }

}
