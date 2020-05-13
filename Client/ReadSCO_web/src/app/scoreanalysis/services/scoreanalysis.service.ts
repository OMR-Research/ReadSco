import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ScoreAnalysisResponse } from '../store/model/scoreanalysisResponse';
import { PipelinesResponse } from '../store/model/pipelinesResponse' 

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable({
    providedIn: 'root'
})
export class ScoreAnalysisService
{
    constructor(private httpClient : HttpClient)
    {
    }

    attemptScoreAnalysis$(base64Image: string)
    {
        let url = environment.apiEndpoint + "/evalScore";
        return this.httpClient.post<ScoreAnalysisResponse>(url, {image: base64Image, pipelineToUse: "ReadScoOfficial"}, httpOptions);
    }

    getScorePipelines$()
    {
        let url = environment.apiEndpoint + "/pipelines";
        return this.httpClient.get<PipelinesResponse>(url, httpOptions);
    }
}