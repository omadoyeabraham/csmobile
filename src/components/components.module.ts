import { NgModule } from '@angular/core';
import { SwitchPortfolioComponent } from './switch-portfolio/switch-portfolio';
import { IonicPageModule } from 'ionic-angular';
import { ColorFormatComponent } from './color-format/color-format';

@NgModule({
	declarations: [
    SwitchPortfolioComponent,
    ColorFormatComponent
  ],
	imports: [
    IonicPageModule.forChild(SwitchPortfolioComponent)
  ],
	exports: [
    SwitchPortfolioComponent,
    ColorFormatComponent
  ]
})
export class ComponentsModule {}
