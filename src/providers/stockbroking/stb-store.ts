import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { IPortfolio } from '../../models/PortfolioInterface'
import { Storage } from '@ionic/storage'

/**
 * Observable data service used to provide stockbroking data app wide
 *Note that this service is a singleton so the same data is available app wide wherever it is injected
 * @author Omadoye Abraham
 */
@Injectable()
export class StbStore {

  /**
   * Behaviour Subjects used for providing Observable data
   */
  public portfoliosSubject = new BehaviorSubject<IPortfolio[]>([])
  public currentPortfolioSubject = new BehaviorSubject<any>({})

  // The stockbroking portfolios owned by the user
  public portfolios: Array<IPortfolio> = []

  // The sma portfolios (for SMA users)
  public smaPortfolios: Array<IPortfolio> = []

  // Total number of portfolios owned by the client
  public numberOfPortfolios: number

  // The index of the portfolio currently selected by the user
  public currentPortfolioIndex: number

  // Used to determine if the user has any stockbroking portfolio
  public userHasStb: boolean = false

  // The portfolio which is currently selected (defaults to the first portfolio)
  public currentPortfolio: IPortfolio


  constructor(public http: Http) {
    // Subscribe to and update the currentPortfolio property whenever a new currentPortfolio is selected
    this.currentPortfolioSubject.subscribe(
      data => {
        this.currentPortfolio = data

      }
    )

  }


  /**
   * Store the user's stockbroking data gotten after login
   */
  storeStbData(userData) :void {
    // If the user has at least 1 STB portfolio
    if (userData.STB.hasOwnProperty('EXCHANGE')) {
      this.portfolios = userData.STB.EXCHANGE
      this.smaPortfolios = userData.STB.MANAGED ? (userData.STB.MANAGED) : []
      this.numberOfPortfolios = this.portfolios.length

      // Default the current portfolio to the first portfolio returned
      this.currentPortfolio = this.portfolios[0]
      this.currentPortfolioIndex = 1

      // The user has a stockbroking portfolio
      this.userHasStb = true

      /**
       * Loop through all the portfolios and perform some needed calculations
       */
      this.portfolios.map((portfolio) => {
        let gainOrLoss = parseFloat(portfolio.currentValuation.amount) - parseFloat(portfolio.costBasis.amount)
        portfolio.gainOrLoss = gainOrLoss
      })

      /**
       * Pass / emit the data gotten on their corresponding Obsevable streams so components that connect to them can use the data.
       * NOTE: The BehaviorSubject will pass the last value generated to new subscribers,
       * hence it must be initialized with a default value
       */
      this.portfoliosSubject.next(this.portfolios)
      this.currentPortfolioSubject.next(this.currentPortfolio)

    }
  }

  /**
   * Set the current portfolio selected by the user and emit it on the appropriate Observable stream
   *
   * @param {any} portfolioIndex
   * @memberof StbStore
   */
  setCurrentPortfolio(portfolioIndex) :void {
    // Default to the last portfolio if we unintentionally overshoot the portfolios length
    if(portfolioIndex > this.portfolios.length) {
      portfolioIndex = this.portfolios.length
    }

    let currentPortfolio = this.portfolios[portfolioIndex]
    this.currentPortfolioSubject.next(currentPortfolio)
  }

}
