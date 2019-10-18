import { Action } from '@ngrx/store';

export enum ActionType 
{
    MIDI_PLAYER_LOADINGSTART = "[ScoreVis] Midi loading start",
    MIDI_PLAYER_LOADSUCCESS  = "[ScoreVis] Midi loading successfull",
    SCORE_RECOGNITION_END    = "[ScoreVis] Score recognition finished" 
}

export class MidiPlayerLoadStart implements Action
{
    readonly type = ActionType.MIDI_PLAYER_LOADINGSTART
    constructor(){};
}

export class MidiPlayerLoadSuccess implements Action
{
    readonly type = ActionType.MIDI_PLAYER_LOADSUCCESS
    constructor(public payload: any){}
}

export class ScoreRecognitionRequestEnd implements Action
{
    readonly type = ActionType.SCORE_RECOGNITION_END
    constructor(public payload: any){}
}

export type ScoreVisualizationActions = 
| MidiPlayerLoadStart
| MidiPlayerLoadSuccess
| ScoreRecognitionRequestEnd