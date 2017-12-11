import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';

/**
 * Service which provides access to the API for stockbroking related actions
 *
 * @export
 * @class StockbrokingProvider
 */
@Injectable()
export class StockbrokingProvider {

  constructor(private http: HttpClient) {
  }

}
