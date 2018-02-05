import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Client } from '../pages/client/client';
import {  ClientOrder } from '../pages/client-order/client-order';
import { Photographer } from '../pages/photographer/photographer';
import { EditAlbum } from '../pages/edit-album/edit-album';
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
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
