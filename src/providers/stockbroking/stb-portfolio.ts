import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IPortfolio } from '../../models/PortfolioInterface';


/**
 * Service provider for data related to the user's stockbroking portfolio
 *
 * @author Omadoye Abraham
 */
@Injectable()
export class StbPortfolioProvider {

  constructor(public http: Http) {
    console.log('Hello StbPortfolioProvider Provider');
  }

  getPortfolios() :Array<IPortfolio>{
    return []
  }

}
