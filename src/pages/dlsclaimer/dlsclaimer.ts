import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';

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

  model: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.model = navParams.get("model");
  }

  ionViewDidLoad() {
  }

  register(){
    this.navCtrl.push(RegisterPage, {
      addInformation: true
    })
  }
}
