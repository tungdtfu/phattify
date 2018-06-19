import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import { SUCCESS_STATUS, ACCESS_DENIED, ERROR_STATUS , API_Socket } from '../../constants/config';


@Injectable()
export class SocketProvider {
  socket:any
  constructor(public http: Http, public loadingCtrl: LoadingController) {
    this.socket = io.connect(API_Socket);
  }

  ConnectSocket(){
    this.socket.on('connect', function(){
      console.log('connect')
    });
    this.socket.on('invitaion_', function(a){
      console.log('a: ', a)
    });
    return this.socket;
  }

  ListenSocketMessage(){

  }

  JoinGroupChat(group_id){
    this.socket.emit('join_to_a_group', {group_id: group_id});
  }

  AddInvitation(data){
    //this.socket.emit('have_invitation', data);
    this.socket.emit('have_invitation'+data.friend_id , data);
  }
  

  JoinAllGroupChat(user_id){
    this.socket.emit('join_to_groups', {user_id: user_id});
  }

  LeaveAGroup(group_id){
    this.socket.emit('leave_group', {group_id: group_id});
  }

  SendMessage(group_id , user_id , user_avatar , user_name , content_type , message){
    let dataMessage = {
      group_id: group_id,
      current_user: {
        id: user_id,
        avatar: user_avatar,
        full_name: user_name,
      },
      content: message ,
      content_type: content_type
    }
    this.socket.emit('send_message', dataMessage);
  }

  ListenAddToGroup(user_id){
    this.socket.on('send_add_user_to_client_' + user_id,
    (data)=>{
      this.JoinGroupChat(data.group_id);
    });
  }
}
