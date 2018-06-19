import { Component } from '@angular/core';

import { ClientPage } from '../client/client';
import { ContactMentorPage } from '../contact-mentor/contact-mentor';
import { CalendarPage } from '../calendar/calendar';
import { SettingPage } from '../setting/setting';
import { FoodplanPage } from '../foodplan/foodplan';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ClientPage;
  tab2Root = ContactMentorPage;
  tab3Root = CalendarPage;
  tab4Root = FoodplanPage;
  tab5Root = SettingPage;
  constructor() {

  }
}
