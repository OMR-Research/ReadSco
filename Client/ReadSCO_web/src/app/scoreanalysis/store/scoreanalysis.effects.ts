import {Effect, Actions, ofType} from '@ngrx/effects'
import * as SAActions from './scoreanalysis.actions'
import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ScoreAnalysisService } from '../services/scoreanalysis.service';
import { ScoreAnalysisResponse } from './model/scoreanalysisResponse';
import { ScoreRecognitionRequestEnd } from 'src/app/scorevisualization/store/scorevisualization.actions';

@Injectable()
export class ScoreAnalysisEffects
{
    @Effect()
    imageLoad$ = this.actions$.pipe(
        ofType(SAActions.ActionType.IMAGE_LOAD_START),
        switchMap((imageLoadAction : SAActions.ImageLoadStart)=>{
            
            const fileReaderPromise = new Promise(resolve => this.fileReader.onloadend = resolve);
            
            this.fileReader.readAsDataURL(imageLoadAction.payload);

            return fileReaderPromise.then((result) => {
                return new SAActions.ImageLoadSuccess(this.fileReader.result);
            })
                        
        })
    );

    @Effect()
    attemptScoreAnalysis$ = this.actions$.pipe(
        ofType(SAActions.ActionType.SCORE_ANALYSIS_START),
        map((action: SAActions.StartScoreAnalysis) => action.payload),
        switchMap(payload => {
            return this.scoreAService.attemptScoreAnalysis$(payload).pipe(
                map((response: ScoreAnalysisResponse) => {
                    return new ScoreRecognitionRequestEnd(response.response);
                })
            )
        })
    )

    constructor(private actions$ : Actions, private fileReader : FileReader, private scoreAService: ScoreAnalysisService)
    {
        fileReader = new FileReader();
    }
}