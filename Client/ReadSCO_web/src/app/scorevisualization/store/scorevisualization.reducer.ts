
import * as fromSVActions from './scorevisualization.actions'

export interface State
{
    midiPlayer: any,
    midiPlayerLoading: boolean
}

const initialState : State = {
    midiPlayer: null,
    midiPlayerLoading: false
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
        default:
            return state
    }
}