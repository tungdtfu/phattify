import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInPage } from './sign-in';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignInPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInPage),
    ReactiveFormsModule
  ],
})
export class SignInPageModule {}
