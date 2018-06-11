import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import {AddInformationPageModule} from "../pages/add-information/add-information.module";
import {DlsclaimerPageModule} from "../pages/dlsclaimer/dlsclaimer.module";
import {SignInPageModule} from "../pages/sign-in/sign-in.module";
import {ClientPage} from "../pages/client/client";
import {ContactMentorPage} from "../pages/contact-mentor/contact-mentor";
import {FoodPlanPage} from "../pages/foodplan/foodplan";
import {SettingPage} from "../pages/setting/setting";
import {CalendarPage} from "../pages/calendar/calendar";
import {TabsPage} from "../pages/tabs/tabs";
import { LoginPage} from "../pages/login/login";
import { LoadingProvider } from '../providers/loading/loading';
import { UserProvider } from '../providers/user/user';

// export function isNotIos(plt) {
    // shortcut function to be reused internally
    // checks navigator.platform to see if it's an actual iOS device
    // this does not use the user-agent string because it is often spoofed
    // an actual iPad will return true, a chrome dev tools iPad will return false

    @NgModule({
        declarations: [
            MyApp,
            ClientPage,
            ContactMentorPage,
            CalendarPage,
            FoodPlanPage,
            SettingPage,
            TabsPage,
            LoginPage,
        ],
        imports: [
            BrowserModule,
            HttpClientModule,
            IonicModule.forRoot(MyApp),
            DlsclaimerPageModule,
            SignInPageModule,
            AddInformationPageModule,
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            ClientPage,
            ContactMentorPage,
            CalendarPage,
            FoodPlanPage,
            SettingPage,
            TabsPage,
            LoginPage,
        ],
        providers: [
            StatusBar,
            SplashScreen,
            {provide: ErrorHandler, useClass: IonicErrorHandler},
            LoadingProvider,
            UserProvider,
        ]
    })
    export class AppModule {
    }
// }
