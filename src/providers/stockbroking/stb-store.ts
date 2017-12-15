import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { IPortfolio } from '../../models/PortfolioInterface'
import { Storage } from '@ionic/storage'
import { StockbrokingProvider } from './stb-service';
import { ITradeOrder } from '../../models/TradeOrderInterface';

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
  public smaPortfoliosSubject = new BehaviorSubject<IPortfolio[]>([])
  public currentPortfolioSubject = new BehaviorSubject<any>({})
  public numberOfPortfoliosSubject = new BehaviorSubject<number>(1)
  public currentPortfolioIndexSubject = new BehaviorSubject<number>(1)
  public tradeOrdersSubject = new BehaviorSubject<any>([])
  public tradeOrdersGroupedByDateSubject = new BehaviorSubject<any>([])
  public outstandingTradeOrdersSubject = new BehaviorSubject<any>([])
  public outstandingTradeOrdersGroupedByDateSubject = new BehaviorSubject<any>([])

  public securityNamesSubject = new BehaviorSubject<any>([])


  /**
   * The Behavior Subjects exposed as observables so components and other services can only access them but not emit values through them.
   */
  public portfolios = this.portfoliosSubject.asObservable()
  public smaPortfolios = this.smaPortfoliosSubject.asObservable()
  public currentPortfolio = this.currentPortfolioSubject.asObservable()
  public numberOfPortfolios = this.numberOfPortfoliosSubject.asObservable()
  public currentPortfolioIndex = this.currentPortfolioIndexSubject.asObservable()

  public tradeOrders = this.tradeOrdersSubject.asObservable()
  public tradeOrdersGroupedByDate = this.tradeOrdersGroupedByDateSubject.asObservable()
  public outstandingTradeOrders = this.outstandingTradeOrdersSubject.asObservable()
  public outstandingTradeOrdersGroupedByDate = this.outstandingTradeOrdersGroupedByDateSubject.asObservable()

  public securityNames = this.securityNamesSubject.asObservable()

  // Used to determine if the user has any stockbroking portfolio
  public userHasStb: boolean = false

  constructor(public http: Http,
              public storage: Storage,
              private stbService: StockbrokingProvider) {
  }

  /**
   * Broadcast old values which are stored on the client end.
   * This is used on reload to pick up the old data
   */
  broadcastOldValues() {

    this.storage.get('stb-currentPortfolio').then((currentPortfolio) => {
      this.currentPortfolioSubject.next(currentPortfolio)
    })

    this.storage.get('stb-portfolios').then((portfolios) => {
      this.portfoliosSubject.next(portfolios)
    })

    this.storage.get('stb-tradeOrders').then((tradeOrders) => {
      this.tradeOrdersSubject.next(tradeOrders)
    })

    this.storage.get('stb-tradeOrdersGroupedByDate').then((groupedTradeOrders) => {
      this.tradeOrdersGroupedByDateSubject.next(groupedTradeOrders)
    })

    this.storage.get('stb-outstandingTradeOrders').then((groupedTradeOrders) => {
      this.outstandingTradeOrdersSubject.next(groupedTradeOrders)
    })

    this.storage.get('stb-outstandingTradeOrdersGroupedByDate').then((groupedTradeOrders) => {
      this.outstandingTradeOrdersGroupedByDateSubject.next(groupedTradeOrders)
    })

    this.storage.get('stb-securityNames').then((securityNames) => {
      this.securityNamesSubject.next(securityNames)
    })

  }

  /**
   * Store the user's stockbroking data gotten after login
   */
  storeStbData(userData) :void {
    // If the user has at least 1 STB portfolio
    if (userData.STB.hasOwnProperty('EXCHANGE')) {
      let portfolios = userData.STB.EXCHANGE
      let smaPortfolios = userData.STB.MANAGED ? (userData.STB.MANAGED) : []
      let numberOfPortfolios = portfolios.length

      // Default the current portfolio to the first portfolio returned
      let currentPortfolio = portfolios[0]

      // The user has a stockbroking portfolio
      this.userHasStb = true

      /**
       * Loop through all the portfolios and perform some needed calculations
       */
      portfolios.map((portfolio) => {
        let gainOrLoss = parseFloat(portfolio.currentValuation.amount) - parseFloat(portfolio.costBasis.amount)
        portfolio.gainOrLoss = gainOrLoss
      })

      /**
       * Pass / emit the data gotten on their corresponding Obsevable streams so components that connect to them can use the data.
       * NOTE: The BehaviorSubject will pass the last value generated to new subscribers,
       * hence it must be initialized with a default value
       */
      this.portfoliosSubject.next(portfolios)
      this.numberOfPortfoliosSubject.next(numberOfPortfolios)
      this.currentPortfolioSubject.next(currentPortfolio)

      // Store the data in the client side store
      this.storage.set('stb-portfolios', portfolios)
      this.storage.set('stb-currentPortfolio', currentPortfolio)


    }
  }

  /**
   * Make call to the stbService to get the user's trade orders.
   * Store these orders on the client side, and also emit them on the BehaviorSubject
   *
   * @param {number} userID
   * @param {number} cacheStatus
   * @memberof StbStore
   */
  storeTradeOrders(userID: number, cacheStatus: number) :void {
    this.stbService.getTradeOrders(userID, cacheStatus).subscribe(
      (data: any) => {
        if (data.item !== undefined) {
          let tradeOrders: ITradeOrder[] = data.item
          let outstandingTradeOrders: ITradeOrder[] = []

          tradeOrders.forEach((tradeOrder: ITradeOrder) => {
            tradeOrder.canBeCancelled = this.stbService.determineIfTradeOrderCanBeCancelled(tradeOrder)
            tradeOrder.isBooked = this.stbService.determineIfTradeOrderIsBooked(tradeOrder)
            tradeOrder.cspOrderStatus = this.stbService.getTradeOrderCspStatus(tradeOrder)

            // Get the outstanding trade orders
            if ((tradeOrder.cspOrderStatus === 'PENDING') ||
                (tradeOrder.cspOrderStatus === 'EXECUTING') ||
                (tradeOrder.fixOrderStatus === 'PARTIALLY_FILLED')) {

                outstandingTradeOrders.push(tradeOrder)
            }
          })

          let groupedOutstandingTradeOrders = this.stbService.groupTradeOrdersByDate(outstandingTradeOrders)

          this.outstandingTradeOrdersSubject.next(outstandingTradeOrders)
          this.storage.set('stb-outstandingTradeOrders', outstandingTradeOrders)

          this.outstandingTradeOrdersGroupedByDateSubject.next(groupedOutstandingTradeOrders)
          this.storage.set('stb-outstandingTradeOrdersGroupedByDate', groupedOutstandingTradeOrders)

          this.tradeOrdersSubject.next(tradeOrders)
          this.storage.set('stb-tradeOrders', tradeOrders)

          let groupedTradeOrders = this.stbService.groupTradeOrdersByDate(tradeOrders)

          this.tradeOrdersGroupedByDateSubject.next(groupedTradeOrders)
          this.storage.set('stb-tradeOrdersGroupedByDate', groupedTradeOrders)

        }

      },
      error => {
        console.error('An error occured whilst getting trade orders')
        console.error(error)
      }
    )
  }

  /**
   * Set the current portfolio selected by the user and emit it on the appropriate Observable stream
   *
   * @param {any} portfolioIndex
   * @memberof StbStore
   */
  setCurrentPortfolio(portfolioIndex) :void {
    let portfolios = this.portfoliosSubject.getValue()

    // Default to the last portfolio if we unintentionally overshoot the portfolios length
    if (portfolioIndex > portfolios.length) {
      portfolioIndex = portfolios.length
    }

    let currentPortfolio = portfolios[portfolioIndex]
    this.currentPortfolioSubject.next(currentPortfolio)
  }

  /**
   * Get the list of securities tradeable on the floor of the NSE, broadcast and store them.
   *
   * @memberof StbStore
   */
  storeSecurityNames() :void {
    this.stbService.getSecurityNames().subscribe(
      data => {
        this.securityNamesSubject.next(data)

        this.storage.set('stb-securityNames', data)
      }
    )
  }



}
