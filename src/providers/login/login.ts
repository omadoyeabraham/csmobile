import { ConstantProvider } from './../constant/constant';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoadingController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  private username = "";
  private password = "";
  private baseURL: string = "";

  constructor(
    public http: Http, 
    private constant: ConstantProvider, 
    private loadingController: LoadingController,
    private welcomeModal: ModalController
    ) {
    console.log('Hello LoginProvider Provider');
  }

  /**
   * Handles customer login
   * 
   * @param username string
   * @param password string
   */
  customerLogin(username: string, password: string){
    let loader = this.loadingController.create({
      content: this.constant.loginLoadingMessage
    });
    loader.present(); 

    this.username = username;
    this.password = password;
    this.baseURL = this.constant.baseURL + 'findCustomerByName';
    let body = {
      username: this.username,
      password: this.password
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.baseURL, body, {headers: headers})
    .map(res => res.json())
    .subscribe(data => {
      if(typeof data !== 'undefined'){
        let welcomePage = this.welcomeModal.create('WelcomePage', {customerData: data});
        welcomePage.present();
        loader.dismiss();
      }
      


      
      // console.log(data);
      // this.customer.setCustomerData(data['customer']);
      // this.fixedIncome.setFIData(data['FI']);
      //console.log(this.customer.getCustomerData());
      
    },
  
  err =>{
    if(err.status === 401){
      this.constant.getToastMessage(this.constant.toastMessagePasswordMismatch);
    }

    if(err.status == null){
      this.constant.getToastMessage(this.constant.toastMessageNetworkError);
    }
    loader.dismiss();    
  });

  }

  

}
