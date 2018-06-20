import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserProvider } from '../../providers/user/user';
import { ResponseStatus } from '../../constants/response-status.constain';
import { LoadingProvider } from '../../providers/loading/loading';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  error: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private loading: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    this.loading.showLoading();
    this.userProvider.refreshToken().subscribe(res => {
      this.loading.hideLoading();
      if (res === ResponseStatus.error) {
        return;
      }
      this.userProvider.getCurrentUserDetails().subscribe(res => {
        if (!res.SideOn || !res.FrontOn || !res.ProfilePicture) {
          this.navCtrl.setRoot(RegisterPage);
        } else {
          this.navCtrl.setRoot(TabsPage);
        }
      })
    }, () => {
      this.loading.hideLoading();
      return;
    });
  }
  register() {
    this.navCtrl.push(RegisterPage);
  }

  login(formData) {
    this.loading.showLoading();
    this.error = false;
    this.userProvider.login(formData.email, formData.password).subscribe(res => {
      this.loading.hideLoading();
      if (res === ResponseStatus.error) {
        this.error = true;
        return;
      }
      this.userProvider.getCurrentUserDetails().subscribe(res => {
        if (!res.SideOn || !res.FrontOn || !res.ProfilePicture) {
          this.navCtrl.setRoot(RegisterPage);
        } else {
          this.navCtrl.setRoot(TabsPage);
        }
      })
    }, () => {
      this.loading.hideLoading();
      this.error = true;
      return;
    });
  }
}
