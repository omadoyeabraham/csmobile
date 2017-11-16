import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StbSummaryPage } from './stb-summary';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    StbSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(StbSummaryPage),
    ComponentsModule
  ],
})
export class StbSummaryPageModule {}
