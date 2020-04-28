import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScoreanalysisPage } from './scoreanalysis.page';
import { MenuComponent } from '../menu/menu.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadComponent } from './upload/upload.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { ComponentLoadingDirective } from './directives/component-loading.directive';
import { CropComponent } from './crop/crop.component';
import { SendComponent } from './send/send.component';
import { MenuModule } from '../menu/menu.module';

const routes: Routes = [
  { path: '', component: UploadComponent  },
  { path: 'crop', component: CropComponent },
  { path: 'confirm', component: SendComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    FlexLayoutModule,
    ImageCropperModule,
    RouterModule.forChild(routes),
    MenuModule
  ],
  declarations: [ScoreanalysisPage, UploadComponent, CropComponent, SendComponent, ComponentLoadingDirective],
  entryComponents: [UploadComponent, CropComponent, SendComponent],
  providers: []
})
export class ScoreanalysisPageModule {}
