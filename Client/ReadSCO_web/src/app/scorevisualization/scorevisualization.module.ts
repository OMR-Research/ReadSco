import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScorevisualizationPage } from './scorevisualization.page';
import { MenuComponent } from '../menu/menu.component';
import { MenuModule } from '../menu/menu.module';
import { ScoreRenderComponent } from './score-render/score-render.component';
import { VerovioService } from './services/verovio-service.service';
import { MaterialModule } from '../material.module';
import { MidiPlayerService } from './services/midi-player.service';

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
    MenuModule,
    MaterialModule
  ],
  declarations: [ScorevisualizationPage, ScoreRenderComponent],
  providers: [VerovioService, MidiPlayerService]
})
export class ScorevisualizationPageModule {}
