import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactMentorPage } from './contact-mentor';

@NgModule({
  declarations: [
    ContactMentorPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactMentorPage),
  ],
})
export class ContactMentorPageModule {}
