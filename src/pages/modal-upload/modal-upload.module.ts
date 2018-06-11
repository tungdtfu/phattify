import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalUploadPage } from './modal-upload';

@NgModule({
  declarations: [
    ModalUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalUploadPage),
  ],
})
export class ModalUploadPageModule {}
