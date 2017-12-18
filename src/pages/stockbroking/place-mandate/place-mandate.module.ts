import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceMandatePage } from './place-mandate';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PlaceMandatePage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceMandatePage),
    ComponentsModule
  ],
})
export class PlaceMandatePageModule {}
