import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScorevisualizationPage } from './scorevisualization.page';
import { MenuComponent } from '../menu/menu.component';
import { MenuModule } from '../menu/menu.module';
import { ScoreRenderComponent } from './score-render/score-render.component';

const routes: Routes = [
  {
    path: '',
    component: ScorevisualizationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MenuModule
  ],
  declarations: [ScorevisualizationPage, ScoreRenderComponent]
})
export class ScorevisualizationPageModule {}
