import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms'
import { StbStore } from '../../../providers/stockbroking/stb-store';
import { StockbrokingProvider } from '../../../providers/stockbroking/stb-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the PlaceMandatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-mandate',
  templateUrl: 'place-mandate.html',
})
export class PlaceMandatePage {

  private orderTypes: Array<Object> = [
    {text: 'BUY', value: 'BUY'},
    {text: 'SELL', value: 'SELL'}
  ]

  private priceOptions: Array<Object> = [
    { text: 'MARKET', value: 'MARKET' },
    { text: 'LIMIT', value: 'LIMIT' }
  ]

  private isLimitOrder: boolean = false
  private isMarketOrder: boolean = false
  private placeMandateForm: FormGroup
  private orderTerm: String
  private selectedSecurity: String

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private stbStore: StbStore,
              private stbService: StockbrokingProvider,
              private loadingController: LoadingController) {

    // Set the selected security if it exists
    if(this.stbStore.securitySelectedOnTradePageSubject.getValue() !== '') {
      this.selectedSecurity = this.stbStore.securitySelectedOnTradePageSubject.getValue()
    }

    this.placeMandateForm = this.formBuilder.group({
      orderType: ['', Validators.required],
      instrument: ['', Validators.required],
      priceType: ['', Validators.required],
      quantityRequested: ['', Validators.required],
      limitPrice: [''],
      orderTermName: ['']
    })

  }

  previewMandate() {
    let tradeOrder = this.placeMandateForm.value

    // SET the other trade details not filled in the form
    tradeOrder.orderOrigin = 'WEB'
    tradeOrder.orderCurrency = 'NGN'
    tradeOrder.portfolioLabel = this.stbStore.currentPortfolioSubject.getValue().label
    tradeOrder.portfolioName = this.stbStore.currentPortfolioSubject.getValue().name

    console.log(tradeOrder)
  }

  ionViewDidLoad() {
  }

  /**
   * Used to set whether or not the order is a limit/market order
   */
  onPriceOptionChange() {
    if(this.placeMandateForm.value.priceOption === 'LIMIT') {
      this.isLimitOrder = true
      this.isMarketOrder = false
    } else {
      this.orderTerm = '0000000000'
      this.isLimitOrder = false
      this.isMarketOrder = true
    }
  }

}
