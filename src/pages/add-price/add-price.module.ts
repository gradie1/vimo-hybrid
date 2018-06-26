import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPricePage } from './add-price';

@NgModule({
  declarations: [
    AddPricePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPricePage),
  ],
})
export class AddPricePageModule {}
