
import * as fromSVActions from './scorevisualization.actions'

export interface ScoreVisState
{
    midiPlayer: any,
    midiPlayerLoading: boolean,
    scoreTranscription: string
}

const initialState : ScoreVisState = {
    midiPlayer: null,
    midiPlayerLoading: false,
    scoreTranscription: ""

}

export function ScoreVisualizationReducer( state = initialState, action : fromSVActions.ScoreVisualizationActions)
{
    switch(action.type)
    {
        case fromSVActions.ActionType.MIDI_PLAYER_LOADINGSTART:
            return {
                ...state,
                midiPlayerLoading: true
            }
        case fromSVActions.ActionType.MIDI_PLAYER_LOADSUCCESS:
            return{
                ...state,
                midiPlayerLoading: false,
                midiPlayer: action.payload
            }
        case fromSVActions.ActionType.SCORE_RECOGNITION_END:
            return {
                ...state,
                scoreTranscription: action.payload
            }
        default:
            return state
    }
}