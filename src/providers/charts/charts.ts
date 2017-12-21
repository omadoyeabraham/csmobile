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

  // Return the data used to plot price movement chart
  getPriceMovementChart(data) {
    const dates = [];
    const values = [];

    if(typeof data === 'undefined') {
      return []
    }

    // Loop through state data and properly format the dates and values
    data.forEach((dayData) => {
      // Remove the timestamp from the date returned
      // const date = dayData.createdDttm.split(' ')[0]

      dates.push(dayData.date)
      values.push(parseFloat(dayData.price))
    });

    // Calculate the data point interval on the Y axis
    const maximumValue = Math.max(...values)
    const minimumValue = Math.min(...values)
    const diffRange = maximumValue - minimumValue

  /**
   * Divide by 500 = (5*100) because we want (5+1) data points
   *                 /100 & *100 so we round up to the nearest 100 using Math.ceil
   */
  const yAxisInterval = ((maximumValue - minimumValue) / 3).toFixed(2)

  const chartData = {
    chart: {
      type: 'area'
    },
    lineWidth: 1,
    title: {
      text: ''
    },
    xAxis: {
      categories: dates,
      labels: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        formatter: function () {
          return this.value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      min: minimumValue,
      max: maximumValue,
      tickInterval: yAxisInterval
    },
    series: [{
      name: ' ',
      data: values,
      showInLegend: false
    }],
    credits: {
      enabled: false
    },
    plotOptions: {
      area: {
        // fillOpacity: 0.1,
        // fillColor: '#4c7396'
      },
      series: {

      }
    }
  }

  return chartData;
}

}
