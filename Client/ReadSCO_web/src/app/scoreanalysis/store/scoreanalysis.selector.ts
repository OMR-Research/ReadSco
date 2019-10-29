import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScoreAnState } from './scoreanalysis.reducer';

const scoreanalysisStateRepresentation = createFeatureSelector<ScoreAnState>('scoreAnalysis');

export const selectOriginalImage = createSelector(
    scoreanalysisStateRepresentation,
    (state: ScoreAnState) => state.imageCropped
);