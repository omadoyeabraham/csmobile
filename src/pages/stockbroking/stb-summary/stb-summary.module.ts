import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StbSummaryPage } from './stb-summary';

@NgModule({
  declarations: [
    StbSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(StbSummaryPage),
  ],
})
export class StbSummaryPageModule {}
