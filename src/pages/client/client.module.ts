import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientPage } from './client';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    ClientPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientPage),
    RoundProgressModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ClientPageModule {}
