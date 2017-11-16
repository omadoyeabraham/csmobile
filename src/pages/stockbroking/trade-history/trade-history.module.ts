import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TradeHistoryPage } from './trade-history';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TradeHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TradeHistoryPage),
    ComponentsModule
  ],
})
export class TradeHistoryPageModule {}
