import {ActionReducerMap} from '@ngrx/store'
import * as fromScoreAnalysis from '../scoreanalysis/store/scoreanalysis.reducer';

export interface AppState
{
    scoreAnalysis : fromScoreAnalysis.State;
}

export const appReducer : ActionReducerMap<AppState> = {
    scoreAnalysis : fromScoreAnalysis.ScoreAnalysisReducer
};