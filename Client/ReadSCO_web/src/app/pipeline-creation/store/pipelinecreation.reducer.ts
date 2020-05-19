import * as actions from './pipelinecreation.actions'

export interface PipelineCreationState
{
    services: string[];
}

const initialState : PipelineCreationState = {
    services: null
}

export function PipelineCreationReducer( state = initialState, action : actions.PipelineCreationActions)
{
    switch(action.type)
    {
        case actions.ActionType.REQUESTAVAILABLESERVICES_SUCCESS:
            return{...state,
                services: action.payload
            }
        default:
            return state;
    }
}