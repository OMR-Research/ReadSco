import {ActionReducerMap} from '@ngrx/store'
import * as fromScoreAnalysis from '../scoreanalysis/store/scoreanalysis.reducer';
import * as fromScoreVisualization from '../scorevisualization/store/scorevisualization.reducer'
import * as fromPipelineCreation from '../pipeline-creation/store/pipelinecreation.reducer'

export interface AppState
{
    scoreAnalysis : fromScoreAnalysis.ScoreAnState;
    scoreVisualization: fromScoreVisualization.ScoreVisState;
    pipelineCreation: fromPipelineCreation.PipelineCreationState;
}

export const appReducer : ActionReducerMap<AppState> = {
    scoreAnalysis : fromScoreAnalysis.ScoreAnalysisReducer,
    scoreVisualization : fromScoreVisualization.ScoreVisualizationReducer,
    pipelineCreation: fromPipelineCreation.PipelineCreationReducer
};