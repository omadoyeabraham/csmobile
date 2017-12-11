import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ChartsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartsProvider {

  constructor(public http: Http) {}

  /**
   * Return the configuration, styling and data necessary to draw a piechart
   *
   * @param chartData
   */
  getPieChart(chartData: Array<any> = []) {
    const chartObject = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemStyle: {
          'fontWeight': 'normal'
        }
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          size: '100%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            formatter: function () {
              return Math.round(this.percentage * 100) / 100 + ' %';
            },
            distance: -40,
            rotation: 10
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'SECTOR PERFORMANCE',
        colorByPoint: true,
        data: chartData

      }]
    }

    return chartObject
  }

  /**
   * Return the configuration, styling and data necessary to draw a bar chart
   *
   * @param chartData
   */
  getBarChart(chartData: Array<any> = []) {
    // Get the sector data for the portofolio and initialize variables
    console.log(chartData)
    let dataSet = chartData
    let graphData = [{
      data: []
    }]
    let categories = []
    let performanceColor = ''

    /**
     * Because we return when detecting portfolios with any holding data at all
     */
    if (dataSet === null) {
      dataSet = []
    }

    dataSet.forEach((data) => {

      // Red for losses and green for gains
      performanceColor = (data.percentageGain < 0) ? '#FF0000' : '#00FF00'

      // Format the data properly for display using highcharts column chart
      graphData[0].data.push({
        y: parseFloat(data.percentageGain),
        color: performanceColor
      })

      categories.push(data.name)

    })

    const chartObject = {
      chart: {
        type: 'column',
        verticalAlign: 'middle',
        height: 190
      },
      title: {
        text: ''
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      xAxis: {
        categories: categories,
      },
      legend: {
        enabled: false,
        align: 'left',
      },
      yAxis: {
        title: {
          text: '( % )'
        }
      },
      credits: {
        enabled: false
      },
      // series: graphData
      series: graphData
    }

    return chartObject;
  }

}
