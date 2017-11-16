import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortfolioHoldingsPage } from './portfolio-holdings';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PortfolioHoldingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PortfolioHoldingsPage),
    ComponentsModule
  ],
})
export class PortfolioHoldingsPageModule {}
