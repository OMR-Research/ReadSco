import {Effect, Actions, ofType} from '@ngrx/effects'
import * as SAActions from './scoreanalysis.actions'
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ScoreAnalysisEffects
{
    @Effect()
    imageLoad = this.actions$.pipe(
        ofType(SAActions.ActionType.IMAGE_LOAD_START),
        switchMap((imageLoadAction : SAActions.ImageLoadStart)=>{
            
            const fileReaderPromise = new Promise(resolve => this.fileReader.onloadend = resolve);
            
            this.fileReader.readAsDataURL(imageLoadAction.payload);

            return fileReaderPromise.then((result) => {
                return new SAActions.ImageLoadSuccess(this.fileReader.result);
            })
                        
        })
    );
    constructor(private actions$ : Actions, private fileReader : FileReader)
    {
        fileReader = new FileReader();
    }
}