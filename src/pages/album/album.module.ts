import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Album } from './album';

@NgModule({
  declarations: [
    Album,
  ],
  imports: [
    IonicPageModule.forChild(Album),
  ] ,
  exports: [
    Album
  ]
})
export class AlbumModule {}
