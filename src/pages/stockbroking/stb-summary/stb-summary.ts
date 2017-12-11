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
  chartType: string = "portfolioPerformance"

  /**
   * Class variables
   */
  initialCurrentPortfolioSubject: any
  currentPortfolio: IPortfolio

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
        let portfolioAllocationChartObject = this.stbGetters.getCurrentPortfolioStockAllocationChartData()
        let portfolioPerformanceChartObject = this.stbGetters.getCurrentPortfolioStockPerformanceChartData()
        Highcharts.chart('portfolioAllocationChart', portfolioAllocationChartObject)
        Highcharts.chart('portfolioPerformanceChart', portfolioPerformanceChartObject)

      }
    )

    // Initialize and draw the charts showing the user's portfolio performance and allocation
    let portfolioAllocationChartObject = this.stbGetters.getCurrentPortfolioStockAllocationChartData()
    let portfolioPerformanceChartObject = this.stbGetters.getCurrentPortfolioStockPerformanceChartData()
    Highcharts.chart('portfolioAllocationChart', portfolioAllocationChartObject)
    Highcharts.chart('portfolioPerformanceChart', portfolioPerformanceChartObject)

  }

  /**
   * Determine whether or not to hide the portfolio performance chart based on what segment is selected
   * This method was used because of the clash btw ionic's segment and highcharts (where charts become
   * invisible after segments are toggled)
   *
   * @return boolean
   */
  hidePerformanceChart() {
    return this.chartType === 'portfolioAllocation'
  }

  /**
   * Determine whether or not to hide the portfolio performance chart based on what segment is selected
   * This method was used because of the clash btw ionic's segment and highcharts (where charts become
   * invisible after segments are toggled)
   *
   * @return boolean
   */
  hideAllocationChart() {
    return this.chartType === 'portfolioPerformance'
  }


}
