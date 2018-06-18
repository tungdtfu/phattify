import { Component, ViewChild, Output, EventEmitter  } from '@angular/core';
import { typeEvent} from '../../constants/config';

// @Component({
//   selector: 'input-chat',
//   inputs: ['placeholder', 'lineHeight'],
//   template:
//       `
//   <ion-textarea #ionTxtArea
//     placeholder='{{placeholder}}'
//     [(ngModel)]="message"
//     (ngModelChange)='onChange($event)'></ion-textarea>
//   `,
//   queries: {
//     ionTxtArea: new ViewChild('ionTxtArea')
//   }
// })
@Component({
  selector: 'input-chat',
  inputs: ['placeholder', 'lineHeight'],
  templateUrl: 'input-chat.html',
  queries: {
         ionTxtArea: new ViewChild('ionTxtArea')
  }
})
export class InputChatComponent {
  @Output()
  SubmitText = new EventEmitter<object>();

  @Output()
  textMessage = new EventEmitter<object>();

  @Output()
  EventInput = new EventEmitter<object>();

  text: string;
  message: any;
  lineHeight: any;
  txtArea: any;
  ionTxtArea: any;
  typeEvent:any;
  
  constructor() {
    this.message = "";
    this.lineHeight = "20px";
    this.typeEvent = typeEvent;
  }
  ngAfterViewInit(){
    this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
    // this.txtArea.style.height = this.lineHeight + "px";
    this.txtArea.setAttribute("rows", 1);
  }

  onChange(newValue){
    // this.txtArea.style.height = this.lineHeight + "px";
    // this.txtArea.style.height =  this.txtArea.scrollHeight + "px";
    // let rows = parseInt((this.txtArea.scrollHeight / 16) + '');
    let rows = this.getNumberRow(this.message);
    
    if(rows <= 4){
      this.txtArea.setAttribute("rows", rows.toString());
    }
    // this.txtArea.setAttribute('rows', parseInt((this.txtArea.scrollHeight / 16) + ""));
    this.textMessage.emit(newValue);
  }

  private getNumberRow (value) {
    return value.split('\n').length;
  }

  clearInput(){
    this.message = "";
    this.txtArea.setAttribute("rows", 1);
    // this.txtArea.style.height = this.lineHeight + "px";
  }

  EventInputChat(data){
    this.EventInput.emit(data);
  } 

  sendMessage(data){
    this.SubmitText.emit(data);
    this.clearInput();
  }

}