import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotographerPage } from './photographer';

@NgModule({
  declarations: [
    PhotographerPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotographerPage),
  ],
})
export class PhotographerPageModule {}
