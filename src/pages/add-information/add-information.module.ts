import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInformationPage } from './add-information';

@NgModule({
  declarations: [
    AddInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(AddInformationPage),
  ],
})
export class AddInformationPageModule {}
