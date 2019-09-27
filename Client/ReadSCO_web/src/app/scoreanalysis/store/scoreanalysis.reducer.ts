import * as fromScoreAnalysisActions from './scoreanalysis.actions'

export interface State
{
    imageLoading: boolean
    imageString: string | ArrayBuffer
    imageCropped: string
}

const initialState : State = 
{
    imageLoading : false,
    imageString : null,
    imageCropped : null
}

export function ScoreAnalysisReducer(state = initialState, action : fromScoreAnalysisActions.ScoreANActions)
{
    switch(action.type)
    {
        case fromScoreAnalysisActions.ActionType.IMAGE_LOAD_START:
            return {
                ...state,
                imageLoading: true    
            }
        case fromScoreAnalysisActions.ActionType.IMAGE_LOAD_SUCCESS:
            return {
                ...state,
                imageLoading: false,
                imageString: action.payload
            }
        case fromScoreAnalysisActions.ActionType.CROP_IMAGE:
            return {
                ...state,
                imageCropped: action.payload
            }
        default:
            return state;
    }
}