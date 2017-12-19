import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { NgClass } from '@angular/common';
import * as Highcharts from 'highcharts';

// Services
import { ChartsProvider } from '../../../providers/charts/charts';
import { StbStore } from '../../../providers/stockbroking/stb-store';
import { IPortfolio } from '../../../models/PortfolioInterface';
import { StbGetters } from '../../../providers/stockbroking/stb-getters';


/**
 * Generated class for the StbSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stb-summary',
  templateUrl: 'stb-summary.html',
})
export class StbSummaryPage {

  // Default chart type shown on component load
  chartType: string = "stockPerformance"

  /**
   * Class variables
   */
  initialCurrentPortfolioSubject: any
  currentPortfolio: IPortfolio
  bondPerformanceChartObject: any
  stockPerformanceChartObject: any
  bondData: any
  stockData: any

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public chartProvider: ChartsProvider,
              private stbStore: StbStore,
              private stbGetters: StbGetters) {

    /**
     * Subscribe to the BehaviorSubject from the stbStore and use the data appropriately
     * This Observer is used so we can get the initial data to be displayed
     */
    this.stbStore.currentPortfolioSubject.subscribe(
      data => {
        this.currentPortfolio = data
        this.bondData = this.stbGetters.getCurrentPortfolioBondData()
        this.stockData = this.stbGetters.getCurrentPortfolioStockData()
      }
    )

  }

  /**
   * Ionic calls this function afters this page is successfully loaded
   */
  ionViewDidLoad() {

  /**
   * Subscribe to the BehaviorSubject from the stbStore and use the data appropriately
   * This observer is used after the component has loaded to continue observing the data stream
   */
    this.stbStore.currentPortfolioSubject.subscribe(
      data => {
        this.currentPortfolio = data

        // Update the charts
        this.bondPerformanceChartObject = this.stbGetters.getCurrentPortfolioBondPerformanceChartData()
        this.stockPerformanceChartObject = this.stbGetters.getCurrentPortfolioStockPerformanceChartData()

        this.bondData = this.stbGetters.getCurrentPortfolioBondData()
        this.stockData = this.stbGetters.getCurrentPortfolioStockData()

        if (this.bondData) {
          Highcharts.chart('bondPerformanceChart', this.bondPerformanceChartObject)
        }
        if (this.stockData) {
          Highcharts.chart('stockPerformanceChart', this.stockPerformanceChartObject)
        }

      }
    )

    // Initialize and draw the charts showing the user's portfolio performance and allocation
     this.bondPerformanceChartObject = this.stbGetters.getCurrentPortfolioBondPerformanceChartData()
     this.stockPerformanceChartObject = this.stbGetters.getCurrentPortfolioStockPerformanceChartData()

    this.bondData = this.stbGetters.getCurrentPortfolioBondData()
    this.stockData = this.stbGetters.getCurrentPortfolioStockData()

    if(this.bondData) {
      Highcharts.chart('bondPerformanceChart', this.bondPerformanceChartObject)
    }
    if(this.stockData) {
      Highcharts.chart('stockPerformanceChart', this.stockPerformanceChartObject)
    }

  }

  /**
   * Determine whether or not to hide the stock performance chart based on what segment is selected
   * This method was used because of the clash btw ionic's segment and highcharts (where charts become
   * invisible after segments are toggled)
   *
   * @return boolean
   */
  hideStockPerformanceChart() {
    return this.chartType === 'bondPerformance'
  }

  /**
   * Determine whether or not to hide the bond performance chart based on what segment is selected
   * This method was used because of the clash btw ionic's segment and highcharts (where charts become
   * invisible after segments are toggled)
   *
   * @return boolean
   */
  hideBondPerformanceChart() {
    return this.chartType === 'stockPerformance'
  }


}
