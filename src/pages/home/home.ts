import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Client} from '../client/client';
import { Photographer} from '../photographer/photographer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}



  onGoToClient(){
    this.navCtrl.push(Client);
  }
  onGoToPhotographer(){
    this.navCtrl.push(Photographer);
  }
}
