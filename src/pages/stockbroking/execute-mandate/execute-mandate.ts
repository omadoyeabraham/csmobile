import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StbStore } from '../../../providers/stockbroking/stb-store'
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StockbrokingProvider } from '../../../providers/stockbroking/stb-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ConstantProvider } from '../../../providers/constant/constant';

/**
 * Generated class for the ExecuteMandatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-execute-mandate',
  templateUrl: 'execute-mandate.html',
})
export class ExecuteMandatePage {

  private tradeOrder
  private orderPromptMessage: string

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private stbStore: StbStore,
              private alertCtrl: AlertController,
              private stbService: StockbrokingProvider,
              private loadingController: LoadingController,
              private constants: ConstantProvider) {

      this.tradeOrder = this.stbStore.previewedTradeOrderSubject.getValue()
  }

  ionViewDidLoad() {
  }

  /**
   * Produces an alert which prompts the user to accept the trade order placement
   *
   * @memberof ExecuteMandatePage
   */
  alertBeforeTradeOrderExecution() {
    const orderType = this.tradeOrder.orderType.toLowerCase()
    const units = this.tradeOrder.quantityRequested
    const stock = this.tradeOrder.instrument
    const limitPrice = this.tradeOrder.limitPrice

    if(this.tradeOrder.priceType === 'MARKET') {
      this.orderPromptMessage = `You are about to ${orderType} ${units} units(s) of ${stock} @ market price`
    } else {
      this.orderPromptMessage = `You are about to ${orderType} ${units} units(s) of ${stock} @ limit price of  ₦${limitPrice}`
    }

    // Show the confirmation alert
    const confirmPrompt = this.alertCtrl.create({
      title: 'Execute your mandate',
      message: this.orderPromptMessage,
      buttons: [
        {
          text: this.tradeOrder.orderType,
          handler: () => {
            this.executeTradeOrder()
          }
        },
        {
          text: 'Cancel',
          handler: () => {

          }
        }
      ]
    })

    confirmPrompt.present()

  }

  /**
   * Execute the tradeOrder on the floor of the Nigerian Stock Exchange
   *
   * @memberof ExecuteMandatePage
   */
  executeTradeOrder() {
    // Show the loading spinner
    let loader = this.loadingController.create({
      content: this.constants.executeTradeOrderLoadingMessage
    });
    loader.present();

    this.stbService.executeTradeOrder(this.tradeOrder).subscribe(
      (data) => {
        console.log(data)

        // Refresh trade orders and clear the storedpreviewed trade orders
        this.stbStore.performActionsAfterMandatePlacement()

        // Hide the loader
        loader.dismiss()

        // Navigate to the trade history page
        this.navCtrl.push('TradeHistoryPage')

        // Show an alert for success
        this.constants.presentToast('Mandate placement successful', 'toastSuccess')
      },
      (error) => {
        console.log(error)
        loader.dismiss()

        // Show an alert for error
        this.constants.presentToast('Mandate placement failed', 'toastError')

        this.navCtrl.push('PlaceMandatePage')
      }
    )
  }

  /**
   * Cancel the previewed order and go back to the Place mandate page
   *
   * @memberof ExecuteMandatePage
   */
  cancelOrder() :void {
    this.navCtrl.push('PlaceMandatePage')
  }

}
