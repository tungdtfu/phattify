import { Component, ViewChild, Input, Output } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

//import pages

@Component({
  selector: 'message-component',
  templateUrl: 'message.html'
})
export class MessageComponent {
  public login_token: any;
  public user_id: any;
  @Input()
  conversation: any = {};

  @Input()
  type: any;
  constructor(private app: App, public navParams: NavParams, public navCtrl: NavController,
    private userProvider: UserProvider
  ) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userProvider.getCurrentUserDetails().subscribe(res => {
      console.log('res', res);
      this.user_id = res.Id;
    })
  }

  buildCurrentJob(current_situation) {
    let current_situation_string;
    if (current_situation && current_situation.length > 0) {
      try {
        let situationObj = JSON.parse(current_situation);
        current_situation_string = situationObj.position ? situationObj.position : '';
        current_situation_string += situationObj.company ? ", " + situationObj.company : "";
      } catch (e) {
        console.log(e.message);
      }
    }
    return current_situation_string;
  }

  showDetail(user_id) {
    // console.log(user_id);
    // let mySelf = false;
    // if(!user_id){
    //   return;
    // }
  }
}
