import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PipelineCreationPage } from './pipeline-creation.page';
import { MenuModule } from '../menu/menu.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', 
    component: PipelineCreationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MenuModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [PipelineCreationPage, DashboardComponent]
})
export class PipelineCreationPageModule {}
