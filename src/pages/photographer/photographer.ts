import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { PhotosProvider } from '../../services/photos';
import { LoadingProvider } from '../../services/loading';
import { FirebaseProvider } from '../../services/firebase';
import 'rxjs/Rx';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-photographer',
  templateUrl: 'photographer.html',
})
export class Photographer {

  private auth: any;
  public albums: any;
  private email: string = "5280@gmail.com";
  private pass: string = "Strider88";


  constructor(public navCtrl: NavController,
    private platform: Platform,
    private modalCtrl: ModalController,
    private _IMG: PhotosProvider,
    private _LOADER: LoadingProvider,
    private _DB: FirebaseProvider) {}

    ionViewDidEnter()
    {
      
       this.platform.ready()
       .then(() => {
         firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
         .then((credentials) => {
           this.loadAndParseAlbums();
         })
         .catch((err: Error) => {
           console.log(err.message);
         });
       });
    }

    loadAndParseAlbums() {
      this.albums = this._DB.renderAlbums();
      this._LOADER.hidePreloader();
    }


    newAlbum() {
      let modal = this.modalCtrl.create('Album');
      modal.onDidDismiss((data) => {
        if(data) {
          this.loadAndParseAlbums();
        }
      });
      modal.present();
    }
}
