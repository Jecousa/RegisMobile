import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { HomePage } from '../home/home';
import { EditAlbum } from '../edit-album/edit-album';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase';


@Component({
  selector: 'page-photographer',
  templateUrl: 'photographer.html',
})
export class Photographer {

  customers: FirebaseListObservable<any>;
  fName='';
  lName='';
  phone='';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider) {
      this.customers = this.firebaseProvider.getCustomers();
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Photographer');
  }
  //Navigation Controls
  onSubmitAlbum(){
      this.navCtrl.push(HomePage);
    }
    onEditAlbum(){
      this.navCtrl.push(EditAlbum);
    }

    addCustomer() {
      this.firebaseProvider.addCustomer(this.fName, this.lName, this.phone);
    }
   
    removeCustomer(id) {
      this.firebaseProvider.removeCustomer(id);
    }
   
}
