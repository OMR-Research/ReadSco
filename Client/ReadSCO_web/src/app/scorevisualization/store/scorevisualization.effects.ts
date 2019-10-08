import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as SVActions from './scorevisualization.actions'
import { switchMap } from 'rxjs/operators';

declare var Soundfont:any;

@Injectable()
export class ScoreVisualizationEffects
{
    @Effect()
    midiPlayerLoad = this.actions$.pipe(
        ofType(SVActions.ActionType.MIDI_PLAYER_LOADINGSTART),
        switchMap((midiloadAction : SVActions.MidiPlayerLoadStart)=>{
            return Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(function (marimba) {
                return new SVActions.MidiPlayerLoadSuccess(marimba)
            })
        })
    )

    constructor(private actions$: Actions)
    {}
}