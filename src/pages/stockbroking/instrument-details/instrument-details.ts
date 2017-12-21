import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StockbrokingProvider } from '../../../providers/stockbroking/stb-service';
import { StbStore } from '../../../providers/stockbroking/stb-store';
import { ChartsProvider } from '../../../providers/charts/charts';
import * as Highcharts from 'highcharts';

/**
 * Generated class for the InstrumentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instrument-details',
  templateUrl: 'instrument-details.html',
})
export class InstrumentDetailsPage {

  selectedInstrument: object
  selectedInstrumentMarketSnapShot: object

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private stbStore: StbStore,
              private chartsService: ChartsProvider) {

    this.selectedInstrument = this.stbStore.securitySelectedOnTradePageSubject.getValue()

  }

  ionViewDidLoad() {
    this.stbStore.selectedSecurityMarketSnapshotSubject.subscribe(
      data => {
        this.selectedInstrumentMarketSnapShot = data

        // Only draw the graph is the data is actually defined
        if (typeof data !== 'undefined' && Object.keys(data).length !== 0) {
          console.log(data)
          // Get data for graph
          const priceMovementGraphObject = this.chartsService.getPriceMovementChart(data.priceMovements)

          // Draw the graph
          Highcharts.chart('priceMovementGraph', priceMovementGraphObject)
        }

      }
    )
  }

}
