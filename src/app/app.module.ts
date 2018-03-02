import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

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
import { albumService } from '../services/albums';
import { PhotosProvider } from '../services/photos';
import { FirebaseProvider } from '../services/firebase';
import { LoadingProvider } from '../services/loading';


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
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    albumService,
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhotosProvider,
    FirebaseProvider,
    LoadingProvider
  ]
})
export class AppModule {}
