import { LoginProvider } from './../../providers/login/login';
import { ConstantProvider } from './../../providers/constant/constant';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StbStore } from '../../providers/stockbroking/stb-store';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

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
    private formBuilder: FormBuilder,
    private loginProvider: LoginProvider,
    private constant: ConstantProvider,
    private loadingController: LoadingController,
    private navController: NavController,
    private stbStore: StbStore,
    private localStore: LocalStorageProvider
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

  }

   /**
   * Close the Login Modal page
   */
  closeLoginPage(){
    this.navController.pop();
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

      /**
       * Call a method on the LocalStorage provider so it is initialized, and subscribes to the various BehaviorSubject data providers that it needs.
       */
      this.localStore.startup()

      // Call the stbStore so it broadcasts the stb data, which will be picked up by the localStorage and other components
      this.stbStore.storeStbData(data)

      this.navController.push('WelcomePage', {customerData: data});
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
