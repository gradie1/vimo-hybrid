import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditArticlePage } from './edit-article';

@NgModule({
  declarations: [
    EditArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(EditArticlePage),
  ],
})
export class EditArticlePageModule {}
