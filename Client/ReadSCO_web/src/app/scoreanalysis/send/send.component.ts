import { Component, OnInit } from '@angular/core';
import { ComponentLoading } from '../services/componentloading.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StartScoreAnalysis } from '../store/scoreanalysis.actions';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit {

  private storeSubscription : Subscription;
  public sendImage : string;
  public displayedImage : string;

  constructor(private componentService: ComponentLoading, private scoreStore : Store<fromApp.AppState>, private router: Router) 
  { 
    this.storeSubscription = this.scoreStore.select('scoreAnalysis').subscribe(cropState => {
      if(cropState.imageCropped != null)
      {
        this.displayedImage = cropState.imageCropped;
        let splitted = this.displayedImage.split(",")
        this.sendImage = splitted[1];
      }
    })
  }

  ngOnInit() {}

  GoBack() 
  {
    this.componentService.ChangeComponent(1);
  }

  SendImage()
  {
    this.scoreStore.dispatch(new StartScoreAnalysis(this.sendImage))
    this.componentService.ChangeComponent(0)
    this.router.navigate(['./scorevisualization'])
  }

}
