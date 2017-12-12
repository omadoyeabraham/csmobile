import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConstantProvider } from '../providers/constant/constant';
import { CustomerProvider } from '../providers/customer/customer';
import { CashAccountProvider } from '../providers/cash-account/cash-account';
import { FixedIncomeProvider } from '../providers/fixed-income/fixed-income';
import { StockbrokingProvider } from '../providers/stockbroking/stb-service';
import { ChartsProvider } from '../providers/charts/charts';
import { StbPortfolioProvider } from '../providers/stockbroking/stb-portfolio';
import { StbStore } from '../providers/stockbroking/stb-store';
import { StbGetters } from '../providers/stockbroking/stb-getters';
import { UtilityServiceProvider } from '../providers/utility-service/utility-service';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { AuthProvider } from '../providers/auth/auth';
import { AuthInterceptor } from '../interceptors/AuthInterceptor';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'csmobile-client-store'
    })
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
    ConstantProvider,
    CustomerProvider,
    CashAccountProvider,
    FixedIncomeProvider,
    StockbrokingProvider,
    ChartsProvider,
    StbPortfolioProvider,
    StbStore,
    StbGetters,
    UtilityServiceProvider,
    LocalStorageProvider,
    AuthProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
