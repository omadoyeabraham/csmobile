import { NgModule } from '@angular/core';
import { SwitchPortfolioComponent } from './switch-portfolio/switch-portfolio';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [SwitchPortfolioComponent],
	imports: [IonicPageModule.forChild(SwitchPortfolioComponent)],
	exports: [SwitchPortfolioComponent]
})
export class ComponentsModule {}
