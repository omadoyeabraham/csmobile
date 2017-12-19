import { Component, ViewChild, Input } from '@angular/core';
import { Slides } from 'ionic-angular';
import { IPortfolio } from '../../models/PortfolioInterface';
import { StbStore } from '../../providers/stockbroking/stb-store';
import { StbGetters } from '../../providers/stockbroking/stb-getters';

/**
 * Generated class for the SwitchPortfolioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'switch-portfolio',
  templateUrl: 'switch-portfolio.html'
})
export class SwitchPortfolioComponent {

  @Input() showTotalValue: boolean
  @Input() showCashAvailableForTrading: boolean

  // Portfolios owned by the user
  portfolios: Array<IPortfolio>

  // The currently selected portfolio
  currentPortfolio: IPortfolio

  // Total number of the user's portfolios
  numberOfPortfolios: number

  // The index of the currently selected portfolio
  currentPortfolioIndex: number

  // Various calculated fields about the currently selected portfolio
  currentPortfolioTotalValue: number

  // The amount available for trading on the current portfolio
  currentPortfolioCashAvailableForTrading: number

  // Expose the slides in the slider to the class for tracking and appropriate update
  @ViewChild(Slides) slides: Slides;

  constructor(private stbStore: StbStore,
              private stbGetters: StbGetters) {

    /**
     * Subscribe to the observable from the stbStore and populate this components instance variables
     */
    this.stbStore.portfoliosSubject.subscribe(
      data => {
        this.portfolios = data
        this.numberOfPortfolios = this.portfolios.length
      }
    )

    this.stbStore.currentPortfolioSubject.subscribe(
      data => {
        this.currentPortfolio = data
        this.currentPortfolioTotalValue = this.stbGetters.getCurrentPortfolioTotalValue()
        this.currentPortfolioIndex = this.stbGetters.getCurrentPortfolioIndex()
        this.currentPortfolioCashAvailableForTrading = this.stbGetters.getCurrentPortfolioCashAvailableForTrading()
        this.stbStore.allSecuritiesInCurrentPortfolioSubject.next(this.stbGetters.getAllSecuritiesInCurrentPortfolio())
      }
    )

  }

  /**
   * Method called when a user slides to a new portfolio using the slide portfolio component
   */
  portfolioChanged() {
    // The current portfolio index is +1 because the portfolios are in a zero indexed array
    let activeSlideIndex = this.slides.getActiveIndex()

    // Hack to ensure that we do not overshoot the number of portfolios index
    if (activeSlideIndex > this.numberOfPortfolios) {
      activeSlideIndex = this.numberOfPortfolios;
    }

    this.stbStore.setCurrentPortfolio(activeSlideIndex)

  }

}
