import * as fromScoreAnalysisActions from './scoreanalysis.actions'

export interface ScoreAnState
{
    imageLoading: boolean
    imageString: string | ArrayBuffer
    imageCropped: string
    pipelines: string[]
}

const initialState : ScoreAnState = 
{
    imageLoading : false,
    imageString : null,
    imageCropped : null,
    pipelines : null
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
        case fromScoreAnalysisActions.ActionType.GET_AVAILABLE_PIPELINES_START:
            return{
                ...state,
                pipelines: null
            }
        case fromScoreAnalysisActions.ActionType.GET_AVAILABLE_PIPELINES_SUCCESS:
            return{
                ...state,
                pipelines: action.payload
            }

        default:
            return state;
    }
}