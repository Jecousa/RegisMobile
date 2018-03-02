import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  firebase from 'firebase';

import { HomePage } from '../pages/home/home';

export const config = {
  apiKey: "AIzaSyAJroU3DVoSkNSJo-bVHSLWMrK5pPJSFTA",
  authDomain: "photopro-f4041.firebaseapp.com",
  databaseURL: "https://photopro-f4041.firebaseio.com",
  projectId: "photopro-f4041",
  storageBucket: "photopro-f4041.appspot.com",
  messagingSenderId: "409749040901"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}


