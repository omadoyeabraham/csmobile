import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UtilityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityServiceProvider {

  constructor(public http: Http) {

  }

  /**
   * Ensure that whatever data is passed in is an array.
   * Convert the data into an array if needed
   *
   * @returns {Array}
   * @memberof UtilityServiceProvider
   */
  ensureDataIsAnArray(data): Array<any> {
    if (typeof data === 'object' && !Array.isArray(data)) {
      // Data is an object
      return [data]
    }

    // Data is an array
    return data
  }

}
