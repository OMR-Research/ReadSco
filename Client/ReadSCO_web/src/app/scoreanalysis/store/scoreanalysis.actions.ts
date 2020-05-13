import {Action} from '@ngrx/store';

export enum ActionType
{
    IMAGE_LOAD_START = '[ScoreAN] Image load start',
    IMAGE_LOAD_SUCCESS = '[ScoreAN] Image load success',
    CROP_IMAGE = '[ScoreAN] Image Crop',
    SCORE_ANALYSIS_START = '[ScoreAN] Score Analysis Start',
    GET_AVAILABLE_PIPELINES_START = '[ScoreAN] Get Score Analysis working pipelines Start',
    GET_AVAILABLE_PIPELINES_SUCCESS = '[ScoreAN] Get Score Analysis pipelines OK'
}

export class ImageLoadStart implements Action
{
    readonly type = ActionType.IMAGE_LOAD_START;
    constructor(public payload: File){}
}

export class ImageLoadSuccess implements Action
{
    readonly type = ActionType.IMAGE_LOAD_SUCCESS;
    constructor(public payload : string | ArrayBuffer){}
}

export class CropImage implements Action
{
    readonly type = ActionType.CROP_IMAGE;
    constructor(public payload: string){};
}

export class StartScoreAnalysis implements Action
{
    readonly type = ActionType.SCORE_ANALYSIS_START;
    constructor(public payload: string){}
}

export class StartGetWorkingPipelines implements Action
{
    readonly type = ActionType.GET_AVAILABLE_PIPELINES_START;
    constructor(){}
}

export class GetWorkingPipelinesSuccess implements Action
{
    readonly type = ActionType.GET_AVAILABLE_PIPELINES_SUCCESS;
    constructor(public payload:string[]){}
}

export type ScoreANActions = 
| ImageLoadStart
| ImageLoadSuccess
| CropImage
| StartScoreAnalysis
| StartGetWorkingPipelines
| GetWorkingPipelinesSuccess;