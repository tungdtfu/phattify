import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SignInPage } from '../pages/sign-in/sign-in';
import { ConversationPage } from '../pages/conversation/conversation';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  keyboard: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignInPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.configPlatform();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tabpages', component: TabsPage },
    ];
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
 


    //Register URL scheme
    // override open handler to navigate on further custom url scheme actions

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  configPlatform() {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.statusBar.overlaysWebView(true);
        this.statusBar.styleLightContent();
        this.keyboard.disableScroll(true);
        let appEl = <HTMLElement>(document.getElementsByTagName('ION-APP')[0]),
          appElHeight = appEl.clientHeight;

        window.addEventListener('native.keyboardshow', (e) => {
          appEl.style.height = (appElHeight - (<any>e).keyboardHeight) + 'px';
        });

        window.addEventListener('native.keyboardhide', () => {
          appEl.style.height = '100%';
        });
      } else if (this.platform.is('android')) {
        this.statusBar.styleDefault();
      }
      this.statusBar.backgroundColorByHexString("#30b6e9");
      this.statusBar.styleLightContent();
    })
  
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
