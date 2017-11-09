import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConstantProvider provider.

  Due to my lack of understanding of TypeScript
  I created this service to house constants
  Please pardon me. I would have used Structs to 
  implement this class. If you are better off than 
  me in TypeScript please change this class to an 
  object that does not need to be instantiated for a 
  better performance - Olaleye Osunsanya

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantProvider {

public baseURL = "http://localhost/restserver/public/api/";

  constructor(public http: Http) {
    console.log('Hello ConstantProvider Provider');
  }

}
