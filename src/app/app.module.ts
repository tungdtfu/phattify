import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingProvider } from '../providers/loading/loading';
import { UserProvider } from '../providers/user/user';
import { AddInformationPage } from '../pages/add-information/add-information';
import { SignInPage } from '../pages/sign-in/sign-in';
import { CalendarPage } from '../pages/calendar/calendar';
import { ClientPage } from '../pages/client/client';
import { ContactMentorPage } from '../pages/contact-mentor/contact-mentor';
import { DlsclaimerPage } from '../pages/dlsclaimer/dlsclaimer';
import { FoodplanPage } from '../pages/foodplan/foodplan';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';
import { SignInPageModule } from '../pages/sign-in/sign-in.module';
import { RegisterPage } from '../pages/register/register';
import { RegisterPageModule } from '../pages/register/register.module';
import { Camera } from '@ionic-native/camera';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ImageProvider } from '../providers/image/image';
import { ChartModule } from 'angular2-highcharts';
declare var require: any;

import { IonicStorageModule } from '@ionic/storage';
import { CommonProvider } from '../providers/common/common';
import { AuthProvider } from '../providers/auth/auth';

// Page
import { ConversationPage } from '../../src/pages/conversation/conversation';

// Component
import { MessageComponent } from '../../src/components/message/message';
import { InputChatComponent } from '../../src/components/input-chat/input-chat';

// Provider
import { ApiProvider } from '../../src/providers/api/api';
import { SocketProvider } from '../../src/providers/services/socket.service';

@NgModule({
  declarations: [
    MyApp,
    AddInformationPage,
    CalendarPage,
    ClientPage,
    ContactMentorPage,
    DlsclaimerPage,
    FoodplanPage,
    SettingPage,
    TabsPage,
    ConversationPage,

    MessageComponent,
    InputChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RegisterPageModule,
    SignInPageModule,
    RoundProgressModule,
    ChartModule.forRoot(require('highcharts')),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddInformationPage,
    CalendarPage,
    ClientPage,
    ContactMentorPage,
    DlsclaimerPage,
    FoodplanPage,
    SettingPage,
    TabsPage,
    ConversationPage,

    MessageComponent,
    InputChatComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider,
    UserProvider,
    UserProvider,
    CommonProvider,
    AuthProvider,
    Camera,
    ImageProvider,
    ApiProvider,
    SocketProvider
  ]
})
export class AppModule { }
