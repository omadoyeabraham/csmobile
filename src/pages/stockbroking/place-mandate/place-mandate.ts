import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms'
import { StbStore } from '../../../providers/stockbroking/stb-store';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private stbStore: StbStore) {

    this.placeMandateForm = this.formBuilder.group({
      orderType: ['', Validators.required],
      security: ['', Validators.required],
      priceOption: ['', Validators.required],
      quantity: ['', Validators.required],
      limitPrice: [''],
      orderTerm: ['', Validators.required]
    })

  }

  logForm() {
     // Because market orders can only be good for a day, and '0000000000' is the code for good for a day
    // if(this.placeMandateForm.value.priceOption === 'MARKET'){
    //   this.placeMandateForm.value.orderTerm = '0000000000'
    // }
    console.log(this.placeMandateForm.value)
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
