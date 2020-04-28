import {ActionReducerMap} from '@ngrx/store'
import * as fromScoreAnalysis from '../scoreanalysis/store/scoreanalysis.reducer';
import * as fromScoreVisualization from '../scorevisualization/store/scorevisualization.reducer'

export interface AppState
{
    scoreAnalysis : fromScoreAnalysis.ScoreAnState;
    scoreVisualization: fromScoreVisualization.ScoreVisState;
}

export const appReducer : ActionReducerMap<AppState> = {
    scoreAnalysis : fromScoreAnalysis.ScoreAnalysisReducer,
    scoreVisualization : fromScoreVisualization.ScoreVisualizationReducer
};