import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { EditAlbum } from '../edit-album/edit-album';

/**
 * Generated class for the PhotographerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photographer',
  templateUrl: 'photographer.html',
})
export class Photographer {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Photographer');
  }
  onSubmitAlbum(){
      this.navCtrl.push(HomePage);
    }
    onEditAlbum(){
      this.navCtrl.push(EditAlbum);
    }
}
