import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstrumentDetailsPage } from './instrument-details';

@NgModule({
  declarations: [
    InstrumentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstrumentDetailsPage),
  ],
})
export class InstrumentDetailsPageModule {}
