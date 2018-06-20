import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, ModalController } from 'ionic-angular';
//import providers
import { ApiProvider } from '../../providers/api/api';
// import { TimeDiffProvider } from '../../providers/services/timeDiff.service';
import { SocketProvider } from '../../providers/services/socket.service';
import { UserProvider } from '../../providers/user/user';
//import plugins

//import pages
import { ConversationPage } from '../conversation/conversation';

@IonicPage()
@Component({
  selector: 'page-list-conversation',
  templateUrl: 'list-conversation.html',
})
export class ListConversationPage {

  listContact: any[] = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private apiProvider: ApiProvider,
    private actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private socketProvider: SocketProvider,
    private userProvider: UserProvider
  ) {
    this.userProvider.getlistContact().subscribe((res:any) => {
      this.listContact =  res.data;
    }, err => {
    })
  }

  ionViewWillEnter() { }

  ionViewWillLeave() {
  }

  chatToContact(uuidContact: string = '21B69402-7E9C-4BA3-99A8-6D84A96FA866') {
    this.navCtrl.push(ConversationPage, { friendId: uuidContact})
  }


}
