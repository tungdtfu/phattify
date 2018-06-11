import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {ModalUploadPage} from "../modal-upload/modal-upload";

@NgModule({
  declarations: [
    LoginPage,ModalUploadPage
  ],
    entryComponents: [
        LoginPage,ModalUploadPage
    ],
  imports: [
    IonicPageModule.forChild(LoginPage),

  ],
})
export class LoginPageModule {}
