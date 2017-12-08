import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { StbStore } from './stb-store';

/*
 * This getters service is used by the stb store to compute various needed values from the data returned by our API call. I extracted it to a seperate service to aid developer experience and keep the codebase as DRY as possible
 *
 * @author Omadoye Abraham
*/
@Injectable()
export class StbGetters {

  constructor(public http: Http, private stbStore: StbStore) {}

  /**
   * Returns the total value of the current selected portfolio
   */
  getCurrentPortfolioTotalValue(): number {
    let currentPortfolio = this.stbStore.currentPortfolio

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


}
