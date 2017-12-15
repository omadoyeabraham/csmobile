import { ConstantProvider } from './../../providers/constant/constant';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StbStore } from '../../providers/stockbroking/stb-store';
import { StockbrokingProvider } from '../../providers/stockbroking/stb-service';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage/es2015/storage';
import { StbGetters } from '../../providers/stockbroking/stb-getters';

/**
 * Generated class for the LoginPage page.
 *
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
    private constant: ConstantProvider,
    private loadingController: LoadingController,
    private navController: NavController,
    private stbStore: StbStore,
    private stbService: StockbrokingProvider,
    private stbGetters: StbGetters,
    private authProvider: AuthProvider,
    private storage: Storage
  ) {
    this.formGroup = this.formBuilder.group(
      {
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = this.formGroup.controls['username'];
    this.password = this.formGroup.controls['password'];
  }


  ionViewDidLoad() {
  }

   /**
   * Close the Login Modal page
   */
  closeLoginPage(){
    this.navController.pop();
  }

  // Display the loading spinner while the user is logging in
  loginUser(){
    let loader = this.loadingController.create({
      content: this.constant.loginLoadingMessage
    });
    loader.present();

    let username = this.username.value;
    let password = this.password.value;

    // Attempt to login the user
    this.authProvider.login(username.trim(), password.trim()).subscribe(data => {

      /**
       * The user has successfully logged in, so carry out the various tasks required to 'bootstrap' the app with data
       *   - Set the authorization header for all subsequent requests
       *   - Get STB tradeOrders
       *   - Get STB tradeOrderTerms
       *   - Get List of securities
       */

      // Having issues with the this.storage call because it returns a promise and we need this value to be immediately resolved
      this.storage.set('token', data.customer.portalPasswordToken)
      localStorage.setItem('auth_token', data.customer.portalPasswordToken)

      // Call the stbStore so it broadcasts the stb data, which will be picked up by the localStorage and other components
      this.stbStore.storeStbData(data)

      /**
       * Make asynchronous calls to get various data items that will be required later
       */
      this.stbStore.storeTradeOrders(data.customer.id, 0)
      this.stbStore.storeSecurityNames()

      // Navigate to the welcome page
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
