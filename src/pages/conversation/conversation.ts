import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, ModalController } from 'ionic-angular';
import { SUCCESS_STATUS, ACCESS_DENIED, ERROR_STATUS, API_Socket, Content_Type, TypeTabIndex, report_type, typeEvent } from '../../constants/config';
import * as moment from 'moment';
import * as io from 'socket.io-client';
//import providers
import { ApiProvider } from '../../providers/api/api';
// import { TimeDiffProvider } from '../../providers/services/timeDiff.service';
import { SocketProvider } from '../../providers/services/socket.service';
import { UserProvider } from '../../providers/user/user';
//import plugins

//import pages

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {
  @ViewChild('content') content: any;

  /**
   * HARD CODE BEGIN
   */
  fake_uuid = '';
  fake_uuid_friend = '21B69402-7E9C-4BA3-99A8-6D84A96FA866';
  fake_loginToken = '';
  fake_groupId = 'd9d0e78e-f248-4ce4-b2ed-c188d8d3a9c7';
  /**
   * HARD CODE END
   */
  listConversation: any = [];
  user: any;
  typingMessage: boolean;
  friend: any;
  socket: any
  chat_input: string;
  chats = [];
  message: any;
  group_id: any;
  group: any;
  ProfileShare: any;
  checkShareProfile: boolean;
  showBoxShadow: boolean;
  friend_ID: any;
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
    this.typingMessage = false;
    if (this.navParams.get('friend')) {
      this.friend = this.navParams.get('friend');
      this.friend_ID = this.friend.id;
      if (this.navParams.get('Profile')) {
        this.checkShareProfile = true;
        this.ProfileShare = this.navParams.get('Profile');
      }
      else {
        this.checkShareProfile = false;
      }
    }
    else {
      this.checkShareProfile = false;
      this.group_id = this.navParams.get('group_id');
      this.friend_ID = this.navParams.get('friend_id');
    }
    //console.log(moment.utc().format('YYYY-MM-DD h:mm:ss a'));
  }

  getCurrentUser() {
    this.userProvider.getCurrentUserDetails().subscribe(res=>{

      this.fake_uuid=res.Id;
      this.fake_uuid_friend = this.navParams.get('friendId');

      this.user = res;

      this.getListConversation(this.friend_ID);
      this.socket = this.socketProvider.ConnectSocket();
      this.socketProvider.JoinGroupChat(this.fake_groupId);
      this.socket.on('send_message_to_client', msg => {
        console.log("new mess from other" + msg);
        // if (this.group_id && msg.group_id == this.group_id && this.navCtrl.getActive().name == 'ConversationPage') {
        // if (this.user.id != msg.current_user.id) {
        // this.apiProvider.readMessage(this.user.id, this.group_id);
        this.addMessageTolist(msg);
        // }
        // }
      });
    })
  }

  deleteConversation() {
  }
  action() {
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'main-action-sheet',
      buttons: [
        {
          text: 'Delete conversation',
          icon: 'ios-trash-outline',
          cssClass: 'btn-action-has-icon',
          handler: () => {
            this.deleteConversation()
          }
        },
        {
          text: 'Report user',
          icon: 'action-sheet-icon-report',
          cssClass: 'btn-action-has-icon',
          handler: () => {
            this.reportUser();
          }
        },
        {
          text: 'Cancel',
        }
      ]
    });
    actionSheet.present();
  }


  ionViewWillEnter() {
    setTimeout(() => {
      this.showBoxShadow = true;
    }, 300);
    this.getCurrentUser();
  }


  getListConversation(friend_id) {
    if (!this.friend) {
      friend_id = friend_id
    }
    else {
      friend_id = this.friend.id;
    }
    //this.loadingScreen.presentLoading();
    this.apiProvider.getListGroupChat(this.user.Id, this.fake_loginToken).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })

    this.apiProvider.getListConversation(this.user.Id, this.fake_groupId, this.fake_uuid_friend, this.fake_loginToken).subscribe(
      res => {
        //this.loadingScreen.dismissLoading();
        if (res.status == SUCCESS_STATUS) {
          let num_of_res = res.data.list_message.length;
          this.friend = res.data.friend_info;
          this.group_id = res.data.group_id;
          for (let i = 0; i < res.data.list_message.length; i++) {
            res.data.list_message[i] = this.formatData(res.data.list_message[i]);
          }
          this.socketProvider.JoinGroupChat(this.group_id);
          this.listConversation = res.data.list_message;
          if (this.checkShareProfile) {
            this.sendMessage(this.checkShareProfile);
            this.checkShareProfile = false;
          }
          console.log(this.listConversation);
          setTimeout(() => {
            this.content.scrollToBottom(300);
          });
        }
        else if (res.status == ERROR_STATUS) {
        }

      },
      error => {
      });
  }


  sendMessage(Profile) {
    let sentMessage = this.message;
    let content_type;
    if (Profile) {
      sentMessage = {
        User_id: this.ProfileShare.id,
        Avartar: this.ProfileShare.avatar,
        Fullname: this.ProfileShare.full_name,
        Current_situation: this.ProfileShare.current_situation
      }
      content_type = 2;
    }
    else {
      sentMessage = {
        Content: sentMessage.replace(/(?:\r\n|\r|\n)/g, '<br />')
      };
      this.message = '';
      content_type = 0;
    }
    //last_time_send_message : moment.utc().format('YYYY-MM-DD h:mm:ss a'),
    let dataMessage = {
      group_id: this.fake_groupId,
      user_id: this.fake_uuid,
      current_user: {
        id: this.user.id,
        avatar: null,
        full_name: this.user.FirstName + ' ' + this.user.SurName,
      },
      content: sentMessage,
      content_type: content_type
    }
    this.socket.emit('send_message', dataMessage);
    this.addMessageTolist(dataMessage);
  }



  formatData(data) {
    
    data.timeDiff = moment.utc(data.createdAt).local().fromNow();
    data.content = JSON.parse(data.Content);
    // if(data.content.Current_situation){
    //   data.content.Current_situation = JSON.parse(data.content.Current_situation);
    // }
    return data;
  }

  addMessageTolist(item) {
    console.log(item);
    var message = {
      content: item.content,
      user_id: item.user_id,
      group_id: item.group_id,
      // avatar: item.current_user.avatar,
      // full_name: item.current_user.full_name,
      created_at: item.created_at,
      timeDiff: '',
      message_type: item.content_type
    };
    // message.timeDiff = moment.utc(message.created_at).local().fromNow();
    // if(message.message_type == Content_Type.Contact){
    //   message.content.Current_situation = JSON.parse(message.content.Current_situation);
    // }
    this.listConversation.push(message);
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 200);
  }


  reportUser() {
  }

  textMessage(data) {
    this.message = data;
  }

  submitChat(data) {
    this.message = data;
    this.sendMessage(false);
  }

  EventInput(data) {
    console.log(data);
    if (data == typeEvent.focus) {
      this.typingMessage = true;
    }
    else {
      this.typingMessage = false;
    }
    console.log(this.typingMessage);
  }



  ionViewWillLeave() {
    this.showBoxShadow = false;
  }

  goback() {
  }

  showDetail() {
  }

}
