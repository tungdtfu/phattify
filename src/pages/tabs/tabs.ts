import { Component } from '@angular/core';

import { ClientPage } from '../client/client';
import { ContactMentorPage } from '../contact-mentor/contact-mentor';
import { CalendarPage } from '../calendar/calendar';
import { FoodplanPage } from '../foodplan/foodplan';
import { SettingPage } from '../setting/setting';

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
