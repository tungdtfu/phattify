import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListConversationPage } from './list-conversation';

@NgModule({
  declarations: [
    ListConversationPage,
  ],
  imports: [
    IonicPageModule.forChild(ListConversationPage),
  ],
})
export class ListConversationPageModule {}
