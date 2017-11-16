import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeHistoryPage } from './trade-history';

@NgModule({
  declarations: [
    TradeHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeHistoryPage),
  ],
})
export class TradeHistoryPageModule {}
