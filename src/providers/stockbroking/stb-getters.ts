import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StbStore } from './stb-store';
import { IPortfolio } from '../../models/PortfolioInterface';
import { UtilityServiceProvider } from '../utility-service/utility-service';
import { IPortfolioHolding } from '../../models/PortfolioHoldingInterface';
import { ChartsProvider } from '../charts/charts';
import * as moment from 'moment'
import { StockbrokingProvider } from './stb-service';
import { Storage } from '@ionic/storage';
import { ITradeOrder } from '../../models/TradeOrderInterface';

/*
 * This getters service is used by the stb store to compute various needed values from the data returned by our API call. I extracted it to a seperate service to aid developer experience and keep the codebase as DRY as possible
 *
 * @author Omadoye Abraham
*/
@Injectable()
export class StbGetters {

  currentPortfolio: IPortfolio

  constructor(public http: Http,
              private stbStore: StbStore,
              private stbService: StockbrokingProvider,
              private storage: Storage,
              private utilityService: UtilityServiceProvider,
              private chartsService: ChartsProvider) {
    /**
     * Subscribe to the BehaviorSubject currentportfolio data stream
     */
    this.stbStore.currentPortfolioSubject.subscribe(
      data => {
        this.currentPortfolio = data
      }
    )
  }

  /**
   * Determine if a current portfolio object has been set
   *
   * @type {boolean}
   * @memberof StbGetters
   */
  currentPortfolioIsNotSet() :boolean {
    let keys = Object.keys(this.currentPortfolio)

    return(keys.length == 0)
  }

  /**
   * Returns the total value of the current selected portfolio
   */
  getCurrentPortfolioTotalValue(): number {
    let currentPortfolio = this.stbStore.currentPortfolioSubject.getValue()

    // Return 0 if the current portfolio is empty
    if (currentPortfolio === {}) {
      return 0
    }

    if ((currentPortfolio.availableCash === undefined) || (currentPortfolio.currentValuation === undefined)) {
      return 0
    }

    const totalValue = parseFloat(currentPortfolio.currentValuation.amount)
    return totalValue
  }

  /**
   * Returns the cash available of the currently selected portfolio
   *
   * @returns {number}
   * @memberof StbGetters
   */
  getCurrentPortfolioCashAvailableForTrading(): number {
    let currentPortfolio = this.stbStore.currentPortfolioSubject.getValue()

    // Return 0 if the current portfolio is empty
    if (currentPortfolio === {} || typeof currentPortfolio === 'undefined') {
      return 0
    }

    return currentPortfolio.availableCash.amount
  }

  /**
   * Get the index of the current portfolio in the array of the entire portfolios
   *
   * @returns {number}
   * @memberof StbGetters
   */
  getCurrentPortfolioIndex(): number {
    let portfolios = this.stbStore.portfoliosSubject.getValue()
    let currentPortfolio = this.stbStore.currentPortfolioSubject.getValue()

    let currentPortfolioIndex = portfolios.findIndex((portfolio) => {
      return portfolio.id === currentPortfolio.id
    })

    currentPortfolioIndex = currentPortfolioIndex + 1 // Because arrays are zero indexed
    if (currentPortfolioIndex > portfolios.length) {
      currentPortfolioIndex = portfolios.length
    }

    return currentPortfolioIndex
  }

  /**
   * Return the portfolio holdings in the currently selected portfolio (stocks + bonds)
   *
   * @memberof StbGetters
   */
  getCurrentPortfolioHoldings() {
    // Ensure that a current portfolio is set
    if(this.currentPortfolioIsNotSet()) {
      return []
    }

    // Check because some portfolios don't have the portfolio holdings index set on the portfolio object
    let portfolioHoldings: IPortfolioHolding[] = this.currentPortfolio.portfolioHoldings ? this.currentPortfolio.portfolioHoldings : []

    // Ensure the portfolio Holdings is always an array of objects
    portfolioHoldings = this.utilityService.ensureDataIsAnArray(portfolioHoldings)

    return portfolioHoldings
  }

  /**
   * Get the stock portfolio holdings of the currently selected portfolio (stocks only)
   *
   * @returns {IPortfolio[]}
   * @memberof StbGetters
   */
  getCurrentPortfolioStockHoldings(): IPortfolioHolding[] {
    let currentPortfolioHoldings = this.getCurrentPortfolioHoldings()

    if (currentPortfolioHoldings.length === 0) {
      return []
    }

    // Filter to pick only equity stock
    let stockPortfolioHoldings = currentPortfolioHoldings.filter((portfolioHolding) => {
      return (portfolioHolding.securityType === 'EQUITY')
    })

    let percentageOfPortfolio = 0
    let gainOrLoss = 0
    let percentageGainOrLoss = 0
    let totalCost = 0
    let totalPortfolioValue = this.getCurrentPortfolioTotalValue()
    let currentPortfolioStockHoldings = []

    stockPortfolioHoldings.forEach((stockPortfolioHolding) => {
      percentageOfPortfolio = ((parseFloat(stockPortfolioHolding.valuation)) / totalPortfolioValue) * 100
      totalCost = parseFloat(stockPortfolioHolding.costBasis) * parseFloat(stockPortfolioHolding.quantityHeld)
      gainOrLoss = parseFloat(stockPortfolioHolding.valuation) - totalCost
      percentageGainOrLoss = (gainOrLoss / totalCost) * 100

      stockPortfolioHolding.percentageOfPortfolio = percentageOfPortfolio
      stockPortfolioHolding.gainOrLoss = gainOrLoss
      stockPortfolioHolding.percentageGainOrLoss = percentageGainOrLoss
      stockPortfolioHolding.totalCost = totalCost

      if (gainOrLoss < 0) {
        stockPortfolioHolding.lost = true
      } else if (gainOrLoss > 0) {
        stockPortfolioHolding.gained = true
      }

      currentPortfolioStockHoldings.push(stockPortfolioHolding)
    })

    return currentPortfolioStockHoldings
  }

  /**
   * Get the bond portfolio holdings of the currently selected portfolio (bonds)
   *
   * @returns {IPortfolioHolding[]}
   * @memberof StbGetters
   */
  getCurrentPortfolioBondHoldings(): IPortfolioHolding[] {
    let currentPortfolioHoldings = this.getCurrentPortfolioHoldings()

    if (currentPortfolioHoldings.length === 0) {
      return []
    }

    const bondPortfolioHoldings = currentPortfolioHoldings.filter((portfolioHolding) => {
      return (portfolioHolding.securityType === 'BOND')
    })

    // Data initialization
    let faceValue = 0
    let accruedCoupon = 0
    let currentPortfolioBondHoldings = []

    // Loop through the bond holding, and perform the necessary calculations
    bondPortfolioHoldings.forEach((bondHolding, index) => {
      faceValue = parseFloat(bondHolding.marketValue)
      accruedCoupon = (parseFloat(bondHolding.dirtyPrice) - parseFloat(bondHolding.marketPrice)) * parseFloat(bondHolding.quantityHeld)

      bondHolding.id = index
      bondHolding.faceValue = faceValue
      bondHolding.accruedCoupon = accruedCoupon
      let nextCouponDate = moment(bondHolding.lastCouponDate).add(90, 'days')
      bondHolding.nextCouponDate = nextCouponDate

      currentPortfolioBondHoldings.push(bondHolding)
    })

    return currentPortfolioBondHoldings

  }

  /**
   * Return the stock data (allocation and performance) for the current portfolio
   *
   * @memberof StbGetters
   */
  getCurrentPortfolioStockData() {
    if(this.currentPortfolioIsNotSet()) {
      return null
    }

    let portfolioHoldings = this.getCurrentPortfolioStockHoldings()
    if (portfolioHoldings.length === 0) {
      return null
    }

    let stockData = []
    let stockValue = 0
    let stockPerformance = 0
    let totalPortfolioValue = 0

    // Obtain the total value of the portfolio
    portfolioHoldings.forEach((portfolioHolding: IPortfolioHolding) => {
      totalPortfolioValue += parseFloat(portfolioHolding.valuation)
    })

    portfolioHoldings.forEach((portfolioHolding: IPortfolioHolding) => {

      // get the stock's performance, value, and % of the portfolio
      stockValue = parseFloat(portfolioHolding.valuation)
      stockPerformance = parseFloat(portfolioHolding.percentGain)

      let percentageOfPortfolio = ((stockValue / totalPortfolioValue) * 100).toFixed(2)
      // Because highcharts requires this structure to draw pie charts
      stockData.push({
        name: portfolioHolding.securityName,
        y: stockValue,
        percentageOfPortfolio: percentageOfPortfolio,
        percentageGain: stockPerformance
      })

    })

    let others = {
      name: 'others',
      y: 0,
      percentageOfPortfolio: 0,
      percentageGain: 0
    }

    // Add all stocks that make up less than 5% of the to an 'others' section instead
    stockData = stockData.filter((stock, index) => {
      if (stock.percentageOfPortfolio < 5.00) {
        others.y += stock.y
        others.percentageOfPortfolio += parseFloat(stock.percentageOfPortfolio)
        others.percentageGain += parseFloat(stock.percentageGain)
        return false

      } else {
        return true
      }
    })

    // Only add others if there are actually others to add
    if (others.y !== 0) {
      stockData.push(others)
    }

    return stockData

  }

  /**
   * Return the chart data used to draw the stock allocation chart for the current portfolio
   *
   */
  getCurrentPortfolioStockAllocationChartData() {
    const chartData = this.chartsService.getPieChart(this.getCurrentPortfolioStockData())

    return chartData
  }

  /**
  * Return the chart data used to draw the stock performance chart for the current portfolio
  *
  */
  getCurrentPortfolioStockPerformanceChartData() {
    const chartData = this.chartsService.getBarChart(this.getCurrentPortfolioStockData())

    return chartData
  }

  /**
   * Get tradeOrders for the currently selected portfolio
   */
  getCurrentPortfolioTradeOrders() {
    let currentPortfolio = this.stbStore.currentPortfolioSubject.getValue()
    let currentPortfolioName = currentPortfolio.name

    let tradeOrders = this.stbStore.tradeOrdersSubject.getValue()

    let currentPortfolioTradeOrders = tradeOrders.filter((tradeOrder: ITradeOrder) => {
      return tradeOrder.portfolioName === currentPortfolioName
    })

    return currentPortfolioTradeOrders
  }

  /**
   * Get the tradeOrders for the currently selected portfolio grouped by date
   */
  getCurrentPortfolioTradeOrdersGroupedByDate() {
    return this.stbService.groupTradeOrdersByDate(this.getCurrentPortfolioTradeOrders())
  }

  /**
   * Get tradeOrders for the currently selected portfolio
   */
  getCurrentPortfolioOutstandingTradeOrders() {
    let currentPortfolioOutstandingTradeOrders = this.getCurrentPortfolioTradeOrders().filter((tradeOrder) => {
      return (tradeOrder.cspOrderStatus === 'PENDING') || (tradeOrder.cspOrderStatus === 'EXECUTING') || (tradeOrder.fixOrderStatus === 'PARTIALLY_FILLED')
    })

    return currentPortfolioOutstandingTradeOrders
  }

  /**
   * Get the outstanding tradeOrders for the currently selected portfolio grouped by date
   */
  getCurrentPortfolioOutstandingTradeOrdersGroupedByDate() {
    return this.stbService.groupTradeOrdersByDate(this.getCurrentPortfolioOutstandingTradeOrders())
  }




}
