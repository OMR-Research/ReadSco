import {Action} from '@ngrx/store';

export enum ActionType
{
    IMAGE_LOAD_START = '[ScoreAN] Image load start',
    IMAGE_LOAD_SUCCESS = '[ScoreAN] Image load success',
    CROP_IMAGE = '[ScoreAN] Image Crop'
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

export type ScoreANActions = 
| ImageLoadStart
| ImageLoadSuccess
| CropImage;