import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as PipelineActions from './pipelinecreation.actions'
import { switchMap, map } from 'rxjs/operators';

import { RequestsService } from '../services/requests-service.service'

import { ServicesModel } from './model/services-model'

@Injectable()
export class PipelineCreationEffects
{
    @Effect()
    attemptServicesRequest$ = this.actions$.pipe(
        ofType(PipelineActions.ActionType.REQUESTAVAILABLESERVICES_START), 
        switchMap((servicesAction: PipelineActions.StartServicesRequest)=>{
            return this.requestsService.getServices$().pipe(
                map((response: ServicesModel) =>{
                    return new PipelineActions.ServicesRequestSuccess(response.services);
                })
            )
        }));

    constructor(private actions$: Actions, private requestsService: RequestsService)
    {}
}