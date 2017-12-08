import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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

  // Expose the slides in the slider to the class for tracking and appropriate update
  @ViewChild(Slides) slides: Slides;

  // Used to emit an event to the parent component whenever the selected portfolio is changed.
  @Output() portfolioHasChanged = new EventEmitter()

  constructor(private stbStore: StbStore, private stbGetters: StbGetters) {
    this.portfolios = this.stbStore.portfolios
    this.currentPortfolio = this.stbStore.currentPortfolio

    this.numberOfPortfolios = this.portfolios.length
    this.currentPortfolioIndex = 1;

    this.currentPortfolioTotalValue = this.stbGetters.getCurrentPortfolioTotalValue()
  }

  /**
   * Method called when a user slides to a new portfolio using the slide portfolio component
   */
  portfolioChanged() {
    // The current portfolio index is +1 because the portfolios are in a zero indexed array
    this.currentPortfolioIndex = this.slides.getActiveIndex() + 1;

    // Emit the event detailing the index of the currently selected portfolio, when a user changes the selected portfolio

    // Hack to ensure that we do not overshoot the number of portfolios index
    if (this.currentPortfolioIndex > this.numberOfPortfolios) {
      this.currentPortfolioIndex = this.numberOfPortfolios;
    }

    this.portfolioHasChanged.emit({
      currentPortfolio: this.currentPortfolioIndex,
      numberOfPortfolios: this.numberOfPortfolios
    })

  }

}
