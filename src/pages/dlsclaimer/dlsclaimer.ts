import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ResponseStatus } from '../../constants/response-status.constain';
import { StorageKey } from '../../constants/storage-key.constain';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import { ClientPage } from '../client/client';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the DlsclaimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dlsclaimer',
  templateUrl: 'dlsclaimer.html',
})
export class DlsclaimerPage {
  jwtHelper = new JwtHelper();
  model: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private loading: LoadingProvider) {
    this.model = navParams.get("model");
  }

  ionViewDidLoad() {
  }

  register() {
    this.loading.showLoading();
    this.userProvider.register(this.model).subscribe(res => {
      this.loading.hideLoading();
      if (status === ResponseStatus.error) {
        return;
      }
      this.navCtrl.setRoot(ClientPage);
    }, err => {
      this.loading.hideLoading();
    })
  }
}
