import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
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
    private navParams: NavParams, 
    private formBuilder: FormBuilder,
    private loginProvider: LoginProvider
  ) {
    this.formGroup = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = this.formGroup.controls['username'];
    this.password = this.formGroup.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   /**
   * Close the Login Modal page
   */
  closeLoginPage(){
    this.viewController.dismiss();
  }

  loginUser(){
    let username = this.username.value;
    let password = this.password.value;
    this.loginProvider.customerLogin(username.trim(), password.trim());
  }

}
