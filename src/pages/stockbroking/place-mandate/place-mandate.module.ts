import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceMandatePage } from './place-mandate';

@NgModule({
  declarations: [
    PlaceMandatePage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceMandatePage),
  ],
})
export class PlaceMandatePageModule {}
