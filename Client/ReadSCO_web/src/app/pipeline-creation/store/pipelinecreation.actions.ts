import { Action } from '@ngrx/store';

export enum ActionType 
{
    REQUESTAVAILABLESERVICES_START = "[Pipelines] Request available services",
    REQUESTAVAILABLESERVICES_SUCCESS = "[Pipelines] Request available services success"   
}

export class StartServicesRequest implements Action
{
    readonly type = ActionType.REQUESTAVAILABLESERVICES_START;
    constructor(){}
}

export class ServicesRequestSuccess implements Action
{
    readonly type = ActionType.REQUESTAVAILABLESERVICES_SUCCESS;
    constructor(public payload: string[]){}
}


export type PipelineCreationActions = 
StartServicesRequest |
ServicesRequestSuccess
