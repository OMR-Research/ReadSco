import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'scoreanalysis', pathMatch: 'full' },
  { path: 'scoreanalysis', loadChildren: './scoreanalysis/scoreanalysis.module#ScoreanalysisPageModule' },
  { path: 'scoreanalysis/crop', loadChildren: './scoreanalysis/scoreanalysis.module#ScoreanalysisPageModule' },
  { path: 'scoreanalysis/confirm', loadChildren: './scoreanalysis/scoreanalysis.module#ScoreanalysisPageModule' },
  { path: 'scorevisualization', loadChildren: './scorevisualization/scorevisualization.module#ScorevisualizationPageModule' },
  { path: 'pipeline-creation', loadChildren: './pipeline-creation/pipeline-creation.module#PipelineCreationPageModule' },
  { path: 'pipeline-creation', loadChildren: './pipeline-creation/pipeline-creation.module#PipelineCreationPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
