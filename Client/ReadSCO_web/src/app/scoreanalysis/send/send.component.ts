import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StartScoreAnalysis, StartGetWorkingPipelines } from '../store/scoreanalysis.actions';
import { selectorPipelines } from '../store/scoreanalysis.selector';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit, OnDestroy {

  private storeSubscription : Subscription;
  private pipelineSubscription : Subscription;
  public sendImage : string;
  public displayedImage : string;
  public pipelines : string[];
  public result: string;
  public errorNoPipeline: boolean;

  constructor(private scoreStore : Store<fromApp.AppState>, private router: Router) 
  { 
    this.errorNoPipeline = false;
    this.pipelines = [];
    this.storeSubscription = this.scoreStore.select('scoreAnalysis').subscribe(cropState => {
      if(cropState.imageCropped != null)
      {
        this.displayedImage = cropState.imageCropped;
        let splitted = this.displayedImage.split(",")
        this.sendImage = splitted[1];
      }
    })
    
    this.pipelineSubscription = this.scoreStore.select(selectorPipelines).subscribe(pipelines => {
      if(pipelines != null)
      {
        pipelines.forEach(pipelineName => {
          this.pipelines.push(pipelineName.substring(0, pipelineName.indexOf('.')));
        })
        console.log(this.pipelines);
      }
    })
  }

  ngOnInit() 
  {
    this.scoreStore.dispatch(new StartGetWorkingPipelines());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.pipelineSubscription.unsubscribe();
  }

  GoBack() 
  {
    this.router.navigate(['./scoreanalysis/crop'])

  }

  SendImage()
  {
    if(this.result == undefined)
    {
      this.errorNoPipeline = true;
    }
    this.scoreStore.dispatch(new StartScoreAnalysis(this.sendImage))
    this.router.navigate(['./scorevisualization'])
  }

}
