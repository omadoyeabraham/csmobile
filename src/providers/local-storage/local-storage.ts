import { Injectable, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Storage } from '@ionic/storage'
import { StbStore } from '../stockbroking/stb-store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { IPortfolio } from '../../models/PortfolioInterface';


/**
 * This provider is used to manage everything related to storing data in the local storage for this app.
 */

@Injectable()
export class LocalStorageProvider implements OnInit{

  public stbPortfoliosSubject = new BehaviorSubject<IPortfolio[]>([])
  public stbCurrentPortfolioSubject = new BehaviorSubject<any>({})

  constructor(public http: Http,
              private localStore: Storage,
              private stbStore: StbStore) {

  }


  ngOnInit() {
  }

  /**
   * Broadcast old values which are stored on the client end.
   * This is used on reload to pick up the old data
   */
  broadcastOldValues() {

    this.localStore.get('stb-currentPortfolio').then((currentPortfolio) => {
      this.stbCurrentPortfolioSubject.next(currentPortfolio)
    })

    this.localStore.get('stb-portfolios').then((portfolios) => {
      this.stbPortfoliosSubject.next(portfolios)
    })

  }

  /**
   * Anemic function used just so the local store is called on app load
   */
  startup() {


    /**
    * Subscribe to the various behavior subjects, so that the local storage will be updated
    * whwn new values are emitted by the data stream.
    * Also emit the new data on the LocalStorageProvider BehaviorSubjects which all components watch
    */
    this.stbStore.portfoliosSubject.subscribe(
      data => {
        this.localStore.set('stb-portfolios', data)
        this.stbPortfoliosSubject.next(data)
      }
    )

    this.stbStore.currentPortfolioSubject.subscribe(
      data => {
        this.localStore.set('stb-currentPortfolio', data)
        this.stbCurrentPortfolioSubject.next(data)
      }
    )
  }

}
