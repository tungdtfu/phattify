import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientDataPage } from './client-data';

@NgModule({
  declarations: [
    ClientDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientDataPage),
  ],
})
export class ClientDataPageModule {}
