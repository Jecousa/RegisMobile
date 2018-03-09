import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Client } from '../pages/client/client';
import { ClientOrder } from '../pages/client-order/client-order';
import { Photographer } from '../pages/photographer/photographer';
import { EditAlbum } from '../pages/edit-album/edit-album';

//FileTransfer Plugins
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyAJroU3DVoSkNSJo-bVHSLWMrK5pPJSFTA",
    authDomain: "photopro-f4041.firebaseapp.com",
    databaseURL: "https://photopro-f4041.firebaseio.com",
    projectId: "photopro-f4041",
    storageBucket: "photopro-f4041.appspot.com",
    messagingSenderId: "409749040901"
  };

 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Client,
    Photographer,
     ClientOrder,
     EditAlbum
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Client,
    Photographer,
     ClientOrder,
     EditAlbum
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
