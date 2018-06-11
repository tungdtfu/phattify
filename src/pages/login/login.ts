import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import {SERVER_URL} from '../../constants/config'
import { AddInformationPage } from '../add-information/add-information';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: any;
  public loginError: any;
  loginSucces : any;
  takePhotoSucces : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _userProvider: UserProvider,
    private _loadingProvider: LoadingProvider,
    private formBuilder: FormBuilder

  
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }


  ionViewDidLoad() {
  }
  login() {
    console.log("hello");
    this.loginSucces = true;
  }
  takeProfile(){
    this.takePhotoSucces = true;
  }
  creatProfile(){
    this.navCtrl.push(AddInformationPage);
  }
}
