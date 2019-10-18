import { ScoreVisState } from "./scorevisualization.reducer";
import { createFeatureSelector, createSelector } from '@ngrx/store';

const scoreVisualizationStateRepresentation = createFeatureSelector<ScoreVisState>('scoreVisualization');

export const selectScoreTranscription = createSelector(
    scoreVisualizationStateRepresentation,
    (state: ScoreVisState) => state.scoreTranscription
);

export const selectMidiPlayer = createSelector(
    scoreVisualizationStateRepresentation,
    (state: ScoreVisState) => state.midiPlayer
)