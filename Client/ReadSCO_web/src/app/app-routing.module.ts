import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'scoreanalysis', pathMatch: 'full' },
  { path: 'scoreanalysis', loadChildren: './scoreanalysis/scoreanalysis.module#ScoreanalysisPageModule' },
  { path: 'scorevisualization', loadChildren: './scorevisualization/scorevisualization.module#ScorevisualizationPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
