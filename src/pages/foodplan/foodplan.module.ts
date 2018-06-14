import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodplanPage } from './foodplan';

@NgModule({
  declarations: [
    FoodplanPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodplanPage),
  ],
})
export class FoodplanPageModule {}
