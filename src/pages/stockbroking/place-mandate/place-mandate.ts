import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { StbStore } from '../../../providers/stockbroking/stb-store';
import { StockbrokingProvider } from '../../../providers/stockbroking/stb-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ConstantProvider } from '../../../providers/constant/constant';
import { StbGetters } from '../../../providers/stockbroking/stb-getters';
import { ITradeOrder } from '../../../models/TradeOrderInterface';

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
  private showQuantityHeld: boolean = false
  private stockQuantityHeld: number
  private placeMandateForm: FormGroup
  private orderTerm: String
  private selectedSecurity: String
  private allSecurities: Array<Object>
  private currentPortfolioSecurities: Array<object>
  private displaySecurities: Array<object>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private stbStore: StbStore,
              private stbService: StockbrokingProvider,
              private stbGetters: StbGetters,
              private loadingController: LoadingController,
              private constants: ConstantProvider) {

    // Ensure that old values already gotten (if applicable) is rebroadcast to all observers
    this.stbStore.broadcastOldValues()

    // Get the list of all securities
    this.allSecurities = this.stbStore.securityNamesSubject.getValue()
    this.displaySecurities = this.allSecurities

    // Set the selected security if it exists
    if(this.stbStore.securitySelectedOnTradePageSubject.getValue() !== '') {
      this.selectedSecurity = this.stbStore.securitySelectedOnTradePageSubject.getValue().name
    }

    this.placeMandateForm = this.formBuilder.group({
      orderType: ['', Validators.required],
      instrument: ['', Validators.required],
      priceType: ['', Validators.required],
      quantityRequested: ['', Validators.required],
      limitPrice: [''],
      orderTermName: ['', Validators.required]
    })

  }

  /**
   * Calculates and displays the trade total, fees and consideration.
   * Also returns an error in the case of insufficient buy or sell orders
   */
  previewMandate() {
    let tradeOrder = this.placeMandateForm.value

    // SET the other trade details not filled in the form
    tradeOrder.orderOrigin = 'WEB'
    tradeOrder.orderCurrency = 'NGN'
    tradeOrder.portfolioLabel = this.stbStore.currentPortfolioSubject.getValue().label
    tradeOrder.portfolioName = this.stbStore.currentPortfolioSubject.getValue().name
    tradeOrder.orderTermLabel = this.stbGetters.getOrderTermLabel(tradeOrder.orderTermName)

    // Show the loading spinner
    let loader = this.loadingController.create({
      content: this.constants.previewTradeOrderLoadingMessage
    });
    loader.present();

    this.stbService.previewTradeOrder(tradeOrder).subscribe(
      (data: any) => {

        // An appropriate value was returned for the getTradeOrderTotal request
        if(data.amount) {
          const orderTotal = parseFloat(data.amount)

          // Set the previewed mandate in the local store
          const previewedTradeOrder = this.getPreviewedTradeOrder(orderTotal, tradeOrder)
          this.stbStore.setPreviewedTradeOrder(previewedTradeOrder)

          // Move to the Execute mandate page
          this.navCtrl.push('ExecuteMandatePage')
        } else {
          // An error object was returned in response to the getTradeOrderTotal request
          this.constants.presentToast(data.status, 'toastError')
        }

        loader.dismiss()
      },
      (error) => {
        console.log(error)
        loader.dismiss()
      }
    )
  }

  ionViewDidLoad() {
    // Subscribe to the allSecuritiesStream so the securitiesInPortfolio data is updated when the user changes the portfolio
    this.stbStore.allSecuritiesInCurrentPortfolioSubject.subscribe(
      data => {
        this.currentPortfolioSecurities = data

        // Set the securities to be displayed if it is a sell order
        if(this.placeMandateForm.value.orderType === 'SELL'){
          this.displaySecurities = data
        }
      }
    )
  }

  /**
   * Used to set whether or not the order is a limit/market order
   */
  onPriceOptionChange() {
    if(this.placeMandateForm.value.priceType === 'LIMIT') {
      this.isLimitOrder = true
      this.isMarketOrder = false
    } else {
      this.orderTerm = '0000000000'
      this.isLimitOrder = false
      this.isMarketOrder = true
    }
  }

  /**
   * Called whenever the order type (BUY/SELL) is changed
   */
  onOrderTypeChange() {
    if(this.placeMandateForm.value.orderType === 'BUY'){
      this.displaySecurities = this.allSecurities
    } else {
      this.displaySecurities = this.stbGetters.getAllSecuritiesInCurrentPortfolio()
    }
  }

  /**
   * Called whenever the instrument selected is changed
   */
  onInstrumentChange() {
    let securitiesInPortfolio = this.stbGetters.getAllSecuritiesInCurrentPortfolio()
    let instrument = this.placeMandateForm.value.instrument

    // Set the instrument selected
    this.stbStore.setSecuritySelectedOnTradePage(instrument)

    // Hide and unset the quantityHeld field
    this.showQuantityHeld = false
    this.stockQuantityHeld = undefined

    // Set and show the quantity held field, if the user selects a stock in their current portfolio
    securitiesInPortfolio.forEach((security) => {

      if(security.name === instrument) {
        this.showQuantityHeld = true
        this.stockQuantityHeld = security.quantityHeld
      }
    })

  }

  /**
   * Generate an object with all the necessary details to show a successfully previewed mandate, and also place the mandate.
   *
   * @returns {Object}
   * @memberof PlaceMandatePage
   */
  getPreviewedTradeOrder(orderTotal: number, tradeMandate: ITradeOrder): ITradeOrder {

    // Format the order total properly for preview
    let formattedTradeOrderTotal = ''
    if (orderTotal < 0) {
      let absoluteOrderTotal = Math.abs(orderTotal).toFixed(2)
      formattedTradeOrderTotal = absoluteOrderTotal.toLocaleString()
      formattedTradeOrderTotal = `(${absoluteOrderTotal})`
    } else {
      formattedTradeOrderTotal = orderTotal.toLocaleString()
    }
    formattedTradeOrderTotal = '₦' + formattedTradeOrderTotal

    // Trade order consideration
    const consideration = this.calculateConsideration(tradeMandate)
    // Total fees
    const totalFees = this.calculateTotalFees(tradeMandate, orderTotal, consideration)
    // Description for order total
    const orderTotalDescription = this.getOrderTotalDescription(tradeMandate)

    tradeMandate.consideration = consideration
    tradeMandate.totalFees = totalFees
    tradeMandate.orderTotalDescription = orderTotalDescription
    tradeMandate.formattedTradeOrderTotal =formattedTradeOrderTotal
    tradeMandate.cashAvailableForTrading = this.stbGetters.getCurrentPortfolioCashAvailableForTrading()

    return tradeMandate

  }

  /**
   * Calculate the consideration on a trade order
   *
   * @param {ITradeOrder} tradeMandate
   * @returns string
   * @memberof PlaceMandatePage
   */
  calculateConsideration(tradeMandate: ITradeOrder) :string {
    if(tradeMandate.priceType === 'LIMIT') {
      let consideration = parseFloat(tradeMandate.limitPrice) * parseFloat(tradeMandate.quantityRequested)
      return consideration.toFixed(2)
    } else {
      const lastTradedPrice = parseFloat(this.stbStore.securitySelectedOnTradePageSubject.getValue().lastTradePrice)
      const percentageOfLastTradedPrice = (10 / 100) * lastTradedPrice

      let consideration: number = parseFloat((tradeMandate.quantityRequested)) * (lastTradedPrice + percentageOfLastTradedPrice)
      return consideration.toFixed(2)
    }
  }

  /**
   * Calculate the total fees for a trade order
   *
   * @returns {string}
   * @memberof PlaceMandatePage
   */
  calculateTotalFees(tradeMandate: ITradeOrder, orderTotal: number, consideration: string) :string {
    let totalFees: any = 0

    const orderConsideration: number = parseFloat(consideration)
    // Buy orders
    if (tradeMandate.orderType === 'BUY') {
      totalFees = orderTotal - orderConsideration
    } else {
      // Sell orders
      totalFees = orderConsideration - orderTotal
    }

    totalFees = totalFees.toFixed(2)
    return totalFees
  }

  /**
   * Get the text used in the orderTotal (displayed after previewing)
   *
   * @returns {string}
   * @memberof PlaceMandatePage
   */
  getOrderTotalDescription(tradeMandate: ITradeOrder) :string {
    if (tradeMandate.orderType === 'BUY') {
     return 'TOTAL ESTIMATED COST'
    } else {
      return 'TOTAL ESTIMATED PROCEEDS'
    }
  }

}
