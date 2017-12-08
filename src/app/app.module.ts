import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginProvider } from '../providers/login/login';
import { ConstantProvider } from '../providers/constant/constant';
import { CustomerProvider } from '../providers/customer/customer';
import { CashAccountProvider } from '../providers/cash-account/cash-account';
import { FixedIncomeProvider } from '../providers/fixed-income/fixed-income';
import { StockbrokingProvider } from '../providers/stockbroking/stockbroking';
import { ChartsProvider } from '../providers/charts/charts';
import { StbPortfolioProvider } from '../providers/stockbroking/stb-portfolio';
import { StbStore } from '../providers/stockbroking/stb-store';
import { StbGetters } from '../providers/stockbroking/stb-getters';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    ConstantProvider,
    CustomerProvider,
    CashAccountProvider,
    FixedIncomeProvider,
    StockbrokingProvider,
    ChartsProvider,
    StbPortfolioProvider,
    StbStore,
    StbGetters
  ]
})
export class AppModule {}
