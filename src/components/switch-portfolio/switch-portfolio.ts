import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    this.text = 'Portfolio Switching Portfolio is here';
  }

}
