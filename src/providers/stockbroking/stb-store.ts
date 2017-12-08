import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IPortfolio } from '../../models/PortfolioInterface';

/**
 * Observable data service used to provide stockbroking data app wide
 *Note that this service is a singleton so the same data is available app wide wherever it is injected
 * @author Omadoye Abraham
 */
@Injectable()
export class StbStore {

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

    }
  }

}
