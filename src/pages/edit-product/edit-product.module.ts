import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProductPage } from './edit-product';

@NgModule({
  declarations: [
    EditProductPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProductPage),
  ],
})
export class EditProductPageModule {}
