import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-client',
  templateUrl: 'client.html'
})
export class ClientPage {

  constructor(public navCtrl: NavController) {

  }
  current = 2;
  max = 100;

  ngOnInit() {
      setInterval(() => {
          this.current = this.current + 1
      }, 1000);
  }




}
