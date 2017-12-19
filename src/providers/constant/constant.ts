import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConstantProvider provider.

  Due to my lack of understanding of TypeScript
  I created this service to house constants
  Please pardon me. I would have used Structs to
  implement this class. If you are better off than
  me in TypeScript please change this class to an
  object that does not need to be instantiated for a
  better performance - Olaleye Osunsanya

*/
@Injectable()
export class ConstantProvider {

  /**
   * URL's for API endpoints
   */
  public baseURL = "https://restserver.cardinalstone.com/public/index.php/api/"

  public findCustomerByNameUrl = this.baseURL + 'findCustomerByName'
  public getTradeOrdersUrl = this.baseURL + 'findCustomerOrders'
  public getSecurityNames = this.baseURL + 'getSecurityNames'
  public getTradeOrderTermsUrl = this.baseURL + 'findActiveTradeOrderTerms'
  public previewTradeOrderUrl = this.baseURL + 'getTradeOrderTotal'
  public marketDataUrl = this.baseURL + 'getSecurity'

  public loginLoadingMessage = "Loading Please Wait..."
  public toastMessagePasswordMismatch = "Username and Password do not match!"
  public toastMessageNetworkError = "Network error, please connect to a network!"
  public toastMessageGeneral = "Something went wrong, please try again later!"
  public toastDuration = 5000
  public toastPosition = "top"
  public previewTradeOrderLoadingMessage = 'Calculating order cost'

  constructor(
    public http: Http,
    private toastController: ToastController
  ) {}

  /**
   * Gets the toast error message
   *
   * @param status Response error status
   * @param toastKind  The toastKind(toastError | toastSuccess | toastInfo)
   */
  presentToast(message: string, toastKind: string){
    let toaster = this.toastController.create({
      message: message,
      duration: this.toastDuration,
      position: this.toastPosition,
      showCloseButton: true,
      cssClass: toastKind
    });
    toaster.present();
  }


}
