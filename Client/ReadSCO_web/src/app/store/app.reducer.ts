import {ActionReducerMap} from '@ngrx/store'
import * as fromScoreAnalysis from '../scoreanalysis/store/scoreanalysis.reducer';
import * as fromScoreVisualization from '../scorevisualization/store/scorevisualization.reducer'

export interface AppState
{
    scoreAnalysis : fromScoreAnalysis.State;
    scoreVisualization: fromScoreVisualization.ScoreVisState;
}

export const appReducer : ActionReducerMap<AppState> = {
    scoreAnalysis : fromScoreAnalysis.ScoreAnalysisReducer,
    scoreVisualization : fromScoreVisualization.ScoreVisualizationReducer
};