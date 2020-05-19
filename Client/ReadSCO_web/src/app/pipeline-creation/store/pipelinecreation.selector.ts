import { PipelineCreationState } from "./pipelinecreation.reducer";
import { createFeatureSelector, createSelector } from '@ngrx/store';

const pipelineCreatorStateRepresentation = createFeatureSelector<PipelineCreationState>('pipelineCreation');

export const selectServices = createSelector(
    pipelineCreatorStateRepresentation,
    (state: PipelineCreationState) => state.services
);
 