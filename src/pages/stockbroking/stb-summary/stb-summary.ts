import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { NgClass } from '@angular/common';
import * as Highcharts from 'highcharts';

// Services
import { ChartsProvider } from '../../../providers/charts/charts';

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

  chartType: string = "portfolioPerformance";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public chartProvider: ChartsProvider) {
  }

  /**
   * Ionic calls this function afters this page is successfully loaded
   */
  ionViewDidLoad() {
    // Initialize and draw the charts showing the user's portfolio performance and allocation

    const portfolioAllocationChartObject = this.chartProvider.getPieChart([]);
    const portfolioPerformanceChartObject = this.chartProvider.getBarChart([]);

    Highcharts.chart('portfolioAllocationChart', portfolioAllocationChartObject);
    Highcharts.chart('portfolioPerformanceChart', portfolioPerformanceChartObject);

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
