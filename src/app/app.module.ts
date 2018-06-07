import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import {AddInformationPageModule} from "../pages/add-information/add-information.module";
import {DlsclaimerPageModule} from "../pages/dlsclaimer/dlsclaimer.module";
export function isNotIos(plt) {
    // shortcut function to be reused internally
    // checks navigator.platform to see if it's an actual iOS device
    // this does not use the user-agent string because it is often spoofed
    // an actual iPad will return true, a chrome dev tools iPad will return false

    // console.log( "isNotIos", ! plt.testNavigatorPlatform('iphone|ipad|ipod'));
    return !plt.testNavigatorPlatform('iphone|ipad|ipod');
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    DlsclaimerPageModule,
    AddInformationPageModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
        scrollAssist: isNotIos,
        // scrollPadding: true,
        // inputBlurring: false,
        autoFocusAssist: true,
        mode: 'ios',
        backButtonText: ''
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
