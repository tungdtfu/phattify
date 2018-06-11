import { Injectable } from '@angular/core';
import { LoadingController, AlertController,ToastController } from 'ionic-angular';
/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
  loading: any;
  constructor(public loadingCtrl: LoadingController,private _alertCtrl: AlertController,private toastCtrl: ToastController ) {
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading ....'
    });
    this.loading.present();
  };

  hideLoading() {
    if(this.loading){
      this.loading.dismiss();
    }
  };
  
  alert(title, message) {
    let alert = this._alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
