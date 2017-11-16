import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortfolioHoldingsPage } from './portfolio-holdings';

@NgModule({
  declarations: [
    PortfolioHoldingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PortfolioHoldingsPage),
  ],
})
export class PortfolioHoldingsPageModule {}
